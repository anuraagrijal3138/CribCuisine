import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HostedCuisineListComponent }    from './hosted-cuisine-list.component';
import { HostedCuisineDetailComponent }  from './hosted-cuisine-detail.component';

import { HostedCuisineService } from './hosted-cuisine.service';

import { CuisineRoutingModule } from './hosted-cuisines-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CuisineRoutingModule
  ],
  declarations: [
    HostedCuisineListComponent,
    HostedCuisineDetailComponent
  ],
  providers: [ HostedCuisineService ]
})
export class HostedCuisinesModule {}