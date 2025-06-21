import { Component } from '@angular/core';
import {TestChartComponent} from '../test-chart/test-chart';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-chart-container',
  imports: [
    TestChartComponent,
    NgClass
  ],
  templateUrl: './chart-container.html',
  styleUrl: './chart-container.css'
})
export class ChartContainer {
  public randomNumber = Math.floor(Math.random() * 100);

  public isEven(): boolean {
    return this.randomNumber % 2 === 0;
  }
}
