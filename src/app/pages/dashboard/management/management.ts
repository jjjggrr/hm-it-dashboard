import {Component, ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';
import { KpiAggregationService } from '../../../../services/kpi-aggregation.service';

declare var bootstrap: any;

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  colors?: string[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid: ApexGrid;
  labels?: string[] | string;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  yaxis?: any;
  legend: ApexLegend;
};

const TOTAL_AGGREGATE_THRESHOLD = 60;
const ALL_HUBS_THRESHOLD = 60;
const EFFICIENCY_THRESHOLD = 65;
const RELIABILITY_THRESHOLD = 75;
const SATISFACTION_THRESHOLD = 55;

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    ChartComponent,
    CommonModule
  ],
  templateUrl: './management.html',
  styleUrl: './management.css'
})
export class ManagementComponent implements AfterViewInit, OnInit {
    @ViewChild("chart") chart!: ChartComponent;
    @ViewChild('ModalInfo') modalInfoElement!: ElementRef;

    // Options for the new large charts
    public totalAggregateScoreOptions!: ChartOptions;
    public allHubsScoreOptions!: ChartOptions;

    // Options for the three category charts below
    public efficiencyScoreOptions!: ChartOptions;
    public reliabilityScoreOptions!: ChartOptions;
    public satisfactionScoreOptions!: ChartOptions;

    // Critical State Flags
    public totalAggregateIsCritical = false;
    public allHubsIsCritical = false;
    public efficiencyIsCritical = false;
    public reliabilityIsCritical = false;
    public satisfactionIsCritical = false;

    // Stats for the main chart's sidebar
    public totalAggregateStats!: {
      high: number;
      low: number;
      current: number;
      change: number;
      changePercent: number;
    };

    infoModal: any;
    modalTitle = '';
    modalBody = '';

    constructor(private kpiService: KpiAggregationService) {}

    ngOnInit(): void {
        const { aggregatedScores, overallHubScores, totalAggregateScore } = this.kpiService.getAggregatedScores();
        const months = Object.keys(overallHubScores['Hub1']);

        // 1. Configure the "Total Aggregated Health Score" chart
        const totalScoreData = Object.values(totalAggregateScore);
        const lastTotalScore = totalScoreData[totalScoreData.length - 1] || 100;
        this.totalAggregateIsCritical = lastTotalScore < TOTAL_AGGREGATE_THRESHOLD;
        this.totalAggregateScoreOptions = this.createChartOptions(
            'Total Aggregated Health Score',
            [{ name: 'Overall Score', data: totalScoreData }],
            months,
            false, // Hide legend for single-series chart
            TOTAL_AGGREGATE_THRESHOLD
        );

        // Calculate stats for the sidebar
        const lastValue = totalScoreData[totalScoreData.length - 1] || 0;
        const secondLastValue = totalScoreData[totalScoreData.length - 2] || 0;
        this.totalAggregateStats = {
          high: Math.max(...totalScoreData),
          low: Math.min(...totalScoreData),
          current: lastValue,
          change: lastValue - secondLastValue,
          changePercent: secondLastValue !== 0 ? ((lastValue - secondLastValue) / secondLastValue) * 100 : 0
        };

        // 2. Configure the "Overall Health Score per Hub" chart
        this.allHubsIsCritical = Object.values(overallHubScores).some(hubData => {
            const values = Object.values(hubData);
            return (values[values.length - 1] || 100) < ALL_HUBS_THRESHOLD;
        });
        this.allHubsScoreOptions = this.createChartOptions(
            'Overall Health Score per Hub',
            Object.keys(overallHubScores).map(hub => ({
                name: hub,
                data: Object.values(overallHubScores[hub])
            })),
            months,
            true,
            ALL_HUBS_THRESHOLD
        );

        // 3. Configure the three category charts
        this.efficiencyIsCritical = Object.values(aggregatedScores['efficiency']).some(hubData => {
            const values = Object.values(hubData);
            return (values[values.length - 1] || 100) < EFFICIENCY_THRESHOLD;
        });
        this.efficiencyScoreOptions = this.createChartOptions(
            'Development & Deployment Efficiency Score',
            Object.keys(aggregatedScores['efficiency']).map(hub => ({
                name: hub,
                data: Object.values(aggregatedScores['efficiency'][hub])
            })),
            months,
            true,
            EFFICIENCY_THRESHOLD
        );

        this.reliabilityIsCritical = Object.values(aggregatedScores['reliability']).some(hubData => {
            const values = Object.values(hubData);
            return (values[values.length - 1] || 100) < RELIABILITY_THRESHOLD;
        });
        this.reliabilityScoreOptions = this.createChartOptions(
            'System Performance & Reliability Score',
            Object.keys(aggregatedScores['reliability']).map(hub => ({
                name: hub,
                data: Object.values(aggregatedScores['reliability'][hub])
            })),
            months,
            true,
            RELIABILITY_THRESHOLD
        );

        this.satisfactionIsCritical = Object.values(aggregatedScores['satisfaction']).some(hubData => {
            const values = Object.values(hubData);
            return (values[values.length - 1] || 100) < SATISFACTION_THRESHOLD;
        });
        this.satisfactionScoreOptions = this.createChartOptions(
            'Customer Satisfaction Score',
            Object.keys(aggregatedScores['satisfaction']).map(hub => ({
                name: hub,
                data: Object.values(aggregatedScores['satisfaction'][hub])
            })),
            months,
            true,
            SATISFACTION_THRESHOLD
        );
    }


    private createChartOptions(title: string, series: ApexAxisChartSeries, categories: string[], showLegend: boolean = true, threshold?: number): ChartOptions {
        const options: ChartOptions = {
            series: series,
            annotations: {}, // Initialize with an empty object to satisfy the type
            chart: {
                height: 350,
                type: 'line',
                zoom: { enabled: false },
                toolbar: { show: false }
            },
            colors: ["#008FFB", "#00E396", "#FEB019", "#E91E63"], // Blue, Green, Yellow, Pink (for Hub 4)
            stroke: {
                curve: 'smooth',
                width: 2
            },
            title: {
                text: title,
                align: 'left'
            },
            xaxis: {
                categories: categories,
            },
            yaxis: {
                min: 0,
                max: 100,
                labels: {
                    formatter: (val: number) => val.toFixed(0)
                }
            },
            grid: {
                padding: { right: 30, left: 20 }
            },
            dataLabels: { enabled: false },
            legend: { show: showLegend }
        };

        if (threshold !== undefined) {
            options.annotations = {
                yaxis: [
                    // Shaded Area
                    {
                        y: 0,
                        y2: threshold,
                        borderColor: 'transparent',
                        fillColor: '#FF4560',
                        opacity: 0.2
                    },
                    // Threshold Line
                    {
                        y: threshold,
                        borderColor: '#FF4560',
                        strokeDashArray: 2,
                        label: {
                            borderColor: '#FF4560',
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                            text: 'Threshold',
                        }
                    }
                ]
            };
        }

        return options;
    }

    ngAfterViewInit(): void {
        this.infoModal = new bootstrap.Modal(this.modalInfoElement.nativeElement);
    }
    showInfo(key: string) {
        // Logic for the modal can be added here later
    }
   
}
