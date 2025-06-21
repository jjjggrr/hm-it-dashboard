import {Component, ViewChild,ElementRef,AfterViewInit} from '@angular/core';
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';
import {series} from '../../../data';
import {ChartContainer} from '../../../charts/chart-container/chart-container';

declare var bootstrap: any;

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
  selector: 'app-management',
  imports: [
    ChartComponent,
    ChartContainer
  ],
  templateUrl: './management.html',
  styleUrl: './management.css'
})
export class ManagementComponent implements AfterViewInit {
  showInfo(key: string) {
// 4. Logik, um den Inhalt basierend auf dem "key" zu setzen
    switch (key) {
      case 'cpu-info':
        this.modalTitle = 'CPU Auslastung';
        this.modalBody = 'Dies ist eine detaillierte Information über die CPU-Auslastung der letzten 24 Stunden.';
        break;
      case 'memory-info':
        this.modalTitle = 'Speichernutzung';
        this.modalBody = 'Hier sehen Sie die aktuelle RAM- und Swap-Nutzung Ihres Systems.';
        break;
      default:
        this.modalTitle = 'Information';
        this.modalBody = 'Keine spezifische Information für diesen Schlüssel gefunden.';
        break;
    }
    this.infoModal.show();
  }

  @ViewChild("chart") chart!: ChartComponent;

  public chartOptions: ChartOptions;

  @ViewChild('ModalInfo') modalInfoElement!: ElementRef;

  // 2. Variable für die Bootstrap-Modal-Instanz
  infoModal: any;


  modalTitle = '';
  modalBody = '';

  ngAfterViewInit(): void {
    // Erstellt eine neue Bootstrap-Modal-Instanz, die wir später mit .show() und .hide() steuern können.
    this.infoModal = new bootstrap.Modal(this.modalInfoElement.nativeElement);
  }

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Hub 1",
          data: series.monthDataSeries4.prices2
        },
      ],
      colors: [
        "#00E396"
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
