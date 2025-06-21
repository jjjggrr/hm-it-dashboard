import {Component, ViewChild} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations, NgApexchartsModule
} from "ng-apexcharts";
import {series} from '../../data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  colors: string[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-test-chart',
  imports: [
    ChartComponent
  ],
  templateUrl: './test-chart.html',
  styleUrl: './test-chart.css'
})
export class TestChartComponent {

  @ViewChild("chart") chart!: ChartComponent;

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Hub 1",
          data: series.monthDataSeries4.prices
        },
        {
          name: "Hub 2",
          data: series.monthDataSeries4.prices1
        }
        ,
        {
          name: "Hub 3",
          data: series.monthDataSeries4.prices2
        }
        ,
        {
          name: "Hub 4",
          data: series.monthDataSeries4.prices3
        }
      ],
      colors: [
        "#00E396",
        "#008FFB",
        "#FEB019",
        "#0F4560"
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      annotations: {
        yaxis: [
          /*{
            y: 50,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396"
              },
              text: "Green Zone"
            }
          },
           */
          {
            y: 0,
            y2: 30,
            borderColor: "#000",
            fillColor: "#FEB019",
            opacity: 0.2,
            label: {
              borderColor: "#333",
              style: {
                fontSize: "10px",
                color: "#333",
                background: "#FEB019"
              },
              text: "Danger Zone"
            }
          }
        ],
        xaxis: [
          /*
          {
            x: new Date("01 Nov 2022").getTime(),
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Anno Test"
            }
          },
          {
            x: new Date("01 Nov 2023").getTime(),
            x2: new Date("01 Nov 2023").getTime(),
            fillColor: "#B3F7CA",
            opacity: 0.4,
            label: {
              borderColor: "#B3F7CA",
              style: {
                fontSize: "10px",
                color: "#fff",
                background: "#00E396"
              },
              offsetY: -10,
              text: "X-axis range"
            }
          }

           */
        ],
        points: []
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        padding: {
          right: 30,
          left: 20
        }
      },
      title: {
        text: "Line with Annotations",
        align: "left"
      },
      labels: series.monthDataSeries4.dates,
      xaxis: {
        type: "datetime"
      }
    };
  }
}
