import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HostedCuisineListComponent }    from './hosted-cuisine-list.component';
import { HostedCuisineDetailComponent }  from './hosted-cuisine-detail.component';

const cuisinesRoutes: Routes = [
  { path: 'hosted-cuisines',  component: HostedCuisineListComponent },
  { path: 'hosted-cuisine/:imgPostKey', component: HostedCuisineDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(cuisinesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CuisineRoutingModule { }