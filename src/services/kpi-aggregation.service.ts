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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Injectable({
  providedIn: 'root'
})
export class KpiAggregationService {

  constructor() { }

  private normalize(value: number | string, metric: keyof typeof allSeriesData): number {
    const dataInfo = allSeriesData[metric];
    if (typeof value === 'string') {
      // Handle SoftwareQuality ratings
      const qualityMap: { [key: string]: number } = { 'A': 100, 'B': 75, 'C': 50, 'D': 25, 'F': 0 };
      return qualityMap[value] || 0;
    }

    switch (metric) {
      // Higher is better
      case 'DeploymentFrequency':
      case 'AutomatedTestCoverage':
      case 'BuildSuccessRate':
      case 'QADetectRate':
        return Math.min(100, (value / 100) * 100); // Assuming %
      case 'AcceptanceRate': // 1-5 stars
        return (value - 1) / 4 * 100;

      // Lower is better
      case 'errorRate':
      case 'CFR':
      case 'DownTime':
        return 100 - value; // Assuming %
      case 'MTR':
        return 100 * (1 - Math.min(value, MAX_VALUES.MTR) / MAX_VALUES.MTR);
      case 'LeadTimeForFeatures':
        return 100 * (1 - Math.min(value, MAX_VALUES.LeadTimeForFeatures) / MAX_VALUES.LeadTimeForFeatures);
      case 'AverageAPIResponseTime':
        return 100 * (1 - Math.min(value, MAX_VALUES.AverageAPIResponseTime) / MAX_VALUES.AverageAPIResponseTime);
      
      default:
        return 0;
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
          normalizedData[metric][hub][month] = this.normalize(value, metric);
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