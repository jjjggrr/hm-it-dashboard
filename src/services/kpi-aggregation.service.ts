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
    const failure = unitInfo.FailureLimit as number;
    const critical = unitInfo.CriticalLimit as number;
    const target = unitInfo.Target as number;
    const isLowerBetter = lowerIsBetterMetrics.includes(metric);

    if (isLowerBetter) {
      // For metrics where lower values are better (e.g., errorRate)
      if (value <= target) return 100;
      if (value >= failure) return 0;
      if (value <= critical) { // In the "good" zone (between target and critical)
        return 60 + ((critical - value) / (critical - target)) * 40;
      } else { // In the "warning" zone (between critical and failure)
        return ((failure - value) / (failure - critical)) * 60;
      }
    } else {
      // For metrics where higher values are better (e.g., acceptance rate)
      if (value >= target) return 100;
      if (value <= failure) return 0;
      if (value >= critical) { // In the "good" zone (between critical and target)
        return 60 + ((value - critical) / (target - critical)) * 40;
      } else { // In the "warning" zone (between failure and critical)
        return ((value - failure) / (critical - failure)) * 60;
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