import { Component } from '@angular/core';
import {TestChartComponent} from '../test-chart/test-chart';

@Component({
  selector: 'app-chart-container',
  imports: [
    TestChartComponent
  ],
  templateUrl: './chart-container.html',
  styleUrl: './chart-container.css'
})
export class ChartContainer {

}
