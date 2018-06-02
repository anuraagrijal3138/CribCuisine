import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { CuisineListComponent }    from './cuisine-list.component';
import { CuisineDetailComponent }  from './cuisine-detail.component';

import { CuisineService } from './cuisine.service';

import { CuisineRoutingModule } from './cuisines-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CuisineRoutingModule
  ],
  declarations: [
    CuisineListComponent,
    CuisineDetailComponent
  ],
  providers: [ CuisineService ]
})
export class CuisinesModule {}