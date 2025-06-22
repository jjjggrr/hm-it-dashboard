import { Injectable } from '@angular/core';
import { series as allSeriesData } from '..//app/test-data';

// Define a type for our normalized data structure
type MonthlyData = { [month: string]: number };
type HubData = { [hub: string]: MonthlyData };

// Define max values for normalization where lower is better
const MAX_VALUES = {
  MTR: 1440, // 1 day in minutes
  LeadTimeForFeatures: 26, // 6 months in weeks
  AverageAPIResponseTime: 2000, // 2 seconds in ms
};
const lowerIsBetterMetrics: (keyof typeof allSeriesData)[] = [
  'errorRate',
  'MTR',
  'CFR',
  'DownTime',
  'LeadTimeForFeatures',
  'QADetectRate',
  'AverageAPIResponseTime'
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Injectable({
  providedIn: 'root'
})
export class KpiAggregationService {

  constructor() { }

  private normalize(value: number, metric: keyof typeof allSeriesData): number {
    const unitInfo = allSeriesData[metric].Unit;
    const critical = unitInfo.CriticalLimit as number;
    const target = unitInfo.Target as number;
    const warningLimit = (unitInfo as any).WarningLimit;
    const warningScore = (unitInfo as any).WarningScore;
    const isLowerBetter = lowerIsBetterMetrics.includes(metric);

    // If a WarningLimit is defined, use the more advanced two-part scale
    if (warningLimit !== undefined && warningScore !== undefined) {
      if (isLowerBetter) {
        // Lower is better (e.g., error rate)
        if (value <= target) return 100;
        if (value >= critical) return 0;
        if (value <= warningLimit) { // In the "good" zone (between target and warning)
          return warningScore + ((warningLimit - value) / (warningLimit - target)) * (100 - warningScore);
        } else { // In the "warning" zone (between warning and critical)
          return ((critical - value) / (critical - warningLimit)) * warningScore;
        }
      } else {
        // Higher is better (e.g., acceptance rate)
        if (value >= target) return 100;
        if (value <= critical) return 0;
        if (value >= warningLimit) { // In the "good" zone
          return warningScore + ((value - warningLimit) / (target - warningLimit)) * (100 - warningScore);
        } else { // In the "warning" zone
          return ((value - critical) / (warningLimit - critical)) * warningScore;
        }
      }
    } else {
      // Otherwise, fall back to the original single-linear-scale logic
      if (isLowerBetter) {
        if (value <= target) return 100;
        if (value >= critical) return 0;
        return 100 - (((value - target) / (critical - target)) * 100);
      } else {
        if (value >= target) return 100;
        if (value <= critical) return 0;
        return ((value - critical) / (target - critical)) * 100;
      }
    }
  }

  public getAggregatedScores() {
    const normalizedData: { [metric: string]: HubData } = {};

    // Step 1: Normalize all data points
    (Object.keys(allSeriesData) as Array<keyof typeof allSeriesData>).forEach(metric => {
      normalizedData[metric] = {};
      const metricData = allSeriesData[metric].Data;
      (Object.keys(metricData) as Array<keyof typeof metricData>).forEach(hub => {
        normalizedData[metric][hub] = {};
        metricData[hub].forEach((value: string | number, index: number) => {
          const month = MONTHS[index];
          normalizedData[metric][hub][month] = this.normalize(Number(value), metric);
        });
      });
    });
    
    // Step 2: Define categories and calculate aggregate scores
    const categories: { [key: string]: (keyof typeof allSeriesData)[] } = {
      efficiency: ['DeploymentFrequency', 'LeadTimeForFeatures', 'BuildSuccessRate', 'AutomatedTestCoverage', 'CFR'],
      reliability: ['errorRate', 'DownTime', 'MTR', 'QADetectRate', 'SoftwareQuality', 'AverageAPIResponseTime'],
      satisfaction: ['AcceptanceRate']
    };

    const aggregatedScores: { [category: string]: HubData } = {};

    (Object.keys(categories) as Array<keyof typeof categories>).forEach(category => {
      aggregatedScores[category] = {};
      const hubs = Object.keys(allSeriesData.errorRate.Data); // Get hub names
      hubs.forEach(hub => {
        aggregatedScores[category][hub] = {};
        MONTHS.forEach(month => {
          const scoresForMonth = categories[category].map(metric => normalizedData[metric][hub][month]);
          const avgScore = scoresForMonth.reduce((a, b) => a + b, 0) / scoresForMonth.length;
          aggregatedScores[category][hub][month] = parseFloat(avgScore.toFixed(2));
        });
      });
    });

    // Step 3: Calculate overall score per hub
    const overallHubScores: HubData = {};
    const allMetrics = [...categories['efficiency'], ...categories['reliability'], ...categories['satisfaction']];
    const hubs = Object.keys(allSeriesData.errorRate.Data);
    hubs.forEach(hub => {
        overallHubScores[hub] = {};
        MONTHS.forEach(month => {
            const scoresForMonth = allMetrics.map(metric => normalizedData[metric][hub][month]);
            const avgScore = scoresForMonth.reduce((a, b) => a + b, 0) / scoresForMonth.length;
            overallHubScores[hub][month] = parseFloat(avgScore.toFixed(2));
        });
    });

    // Step 4: Calculate a single aggregated score across all hubs
    const totalAggregateScore: MonthlyData = {};
    MONTHS.forEach(month => {
      const monthlyScores = hubs.map(hub => overallHubScores[hub][month]);
      const totalAvg = monthlyScores.reduce((a, b) => a + b, 0) / monthlyScores.length;
      totalAggregateScore[month] = parseFloat(totalAvg.toFixed(2));
    });

    return { aggregatedScores, overallHubScores, totalAggregateScore };
  }
}