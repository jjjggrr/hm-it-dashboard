import { Component, Input } from '@angular/core';
import { TestChartComponent } from '../test-chart/test-chart';
import { CommonModule } from '@angular/common';
import { series } from '../../test-data';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [
    TestChartComponent,
    CommonModule
  ],
  templateUrl: './chart-container.html',
  styleUrl: './chart-container.css'
})
export class ChartContainer {
  @Input() dataKey: keyof typeof series = 'errorRate';
  public isCritical = false;

  onCriticalStateChange(critical: boolean) {
    this.isCritical = critical;
  }
}