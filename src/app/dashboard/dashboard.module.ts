import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';

import { BookedCuisinesModule }       from './booked-cuisines/booked-cuisines.module';
import { HostedCuisinesModule }       from './hosted-cuisines/hosted-cuisines.module';
import { NotificationsModule }        from './notifications/notifications.module';
 
import { DashboardHomeComponent }     from './dashboard-home.component';


@NgModule({
  imports: [
    CommonModule,
    BookedCuisinesModule,
    HostedCuisinesModule,
    NotificationsModule
  ],
  declarations: [
    DashboardHomeComponent
  ]
})
export class DashboardModule { }
