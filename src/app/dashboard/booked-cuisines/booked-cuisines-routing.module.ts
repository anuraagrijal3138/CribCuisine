import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookedCuisineListComponent }    from './booked-cuisine-list.component';
import { BookedCuisineDetailComponent }  from './booked-cuisine-detail.component';

const cuisinesRoutes: Routes = [
  { path: 'booked-cuisines',  component: BookedCuisineListComponent },
  { path: 'booked-cuisine/:imgPostKey', component: BookedCuisineDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(cuisinesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookedCuisineRoutingModule { }