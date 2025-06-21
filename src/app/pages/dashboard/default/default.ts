import {Component} from '@angular/core';
import {ChartContainer} from '../../../charts/chart-container/chart-container';

@Component({
  selector: 'app-default',
  imports: [
    ChartContainer
  ],
  templateUrl: './default.html',
  styleUrl: './default.css'
})
export class DefaultComponent {

}
