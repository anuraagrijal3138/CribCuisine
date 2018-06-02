import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CuisineListComponent }    from './cuisine-list.component';
import { CuisineDetailComponent }  from './cuisine-detail.component';

const cuisinesRoutes: Routes = [
  { path: 'cuisines',  component: CuisineListComponent },
  { path: 'cuisine/:imgPostKey', component: CuisineDetailComponent }
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