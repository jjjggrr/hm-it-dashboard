import {Routes} from '@angular/router';
import {NotFoundComponent} from './pages/functions/not-found/not-found';
import {DefaultComponent} from './pages/dashboard/default/default';
import {ManagementComponent} from './pages/dashboard/management/management';
import {LandingComponent} from './pages/landing/landing';
import {TestChartComponent} from './charts/test-chart/test-chart';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'dashboard/default', component: DefaultComponent},
  {path: 'dashboard/management', component: ManagementComponent},
  {path: 'chart', component: TestChartComponent},
  {path: '**', component: NotFoundComponent}
];
