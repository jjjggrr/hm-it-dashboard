import {Component, ViewChild, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
  ApexResponsive
} from "ng-apexcharts";
import { series as testSeries } from '../../test-data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  colors: string[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels?: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  responsive?: ApexResponsive[];
};

// Helper to define which metrics are "lower is better"
const lowerIsBetterMetrics: (keyof typeof testSeries)[] = [
  'errorRate',
  'MTR',
  'CFR',
  'DownTime',
  'LeadTimeForFeatures',
  'QADetectRate',
  'AverageAPIResponseTime'
];

@Component({
  selector: 'app-test-chart',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './test-chart.html',
  styleUrl: './test-chart.css'
})
export class TestChartComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;

  @Input() dataKey: keyof typeof testSeries = 'errorRate';
  @Output() isCritical = new EventEmitter<boolean>();
  public chartOptions!: ChartOptions;

  constructor() {
  }

  ngOnInit(): void {
    const chartMetric = testSeries[this.dataKey];
    const seriesData = (Object.keys(chartMetric.Data) as Array<keyof typeof chartMetric.Data>).map(hub => ({
      name: hub as string,
      data: chartMetric.Data[hub].map(v => {
        // The data is now always a number, so direct conversion is fine.
        return Number(v);
      })
    }));

    // Determine if the metric's most recent value is critical
    const threshold = chartMetric.Unit.CriticalLimit;
    const isLowerBetter = lowerIsBetterMetrics.includes(this.dataKey);
    let critical = false;

    critical = seriesData.some(series => {
        const lastValue = series.data[series.data.length - 1];
        // A value equal to the threshold is now correctly flagged as critical.
        return isLowerBetter ? lastValue >= (threshold as number) : lastValue <= (threshold as number);
    });
    // Make emission asynchronous to avoid change detection issues
    setTimeout(() => this.isCritical.emit(critical));


    this.chartOptions = {
      series: seriesData,
      annotations: {}, // Initialize
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      colors: [
        "#00E396",
        "#008FFB",
        "#FEB019",
        "#E91E63"
      ],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: `${this.formatTitle(this.dataKey)} (${chartMetric.Unit.Name})`,
        align: "left"
      },
      grid: {
        padding: {
          right: 30,
          left: 20
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 280
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 250
            },
            title: {
              style: {
                fontSize: "13px"
              }
            }
          }
        }
      ]
    };

    // Add annotations for the threshold
    if (threshold !== undefined) {
        let y_start = 0;
        let y_end = 0;
        let threshold_line = 0;

        // The generic logic now handles all cases correctly.
        threshold_line = threshold as number;
        if (isLowerBetter) {
            // Bad area is above the threshold
            y_start = threshold_line;
            // Set y_end to a very large number to extend the annotation to the top of the chart
            y_end = Number.MAX_SAFE_INTEGER;
        } else {
            // Bad area is below the threshold
            y_start = 0;
            y_end = threshold_line;
        }
        this.chartOptions.annotations = {
            yaxis: [
                {
                    y: y_start,
                    y2: y_end,
                    borderColor: 'transparent',
                    fillColor: '#FF4560',
                    opacity: 0.2
                },
                {
                    y: threshold_line,
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
  }

  private formatTitle(key: string): string {
    const withSpaces = key.replace(/([A-Z])/g, ' $1');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }
}