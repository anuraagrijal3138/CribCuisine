import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { BookedCuisineListComponent }    from './booked-cuisine-list.component';
import { BookedCuisineDetailComponent }  from './booked-cuisine-detail.component';

import { BookedCuisineService } from './booked-cuisine.service';

import { BookedCuisineRoutingModule } from './booked-cuisines-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BookedCuisineRoutingModule
  ],
  declarations: [
    BookedCuisineListComponent,
    BookedCuisineDetailComponent
  ],
  providers: [ BookedCuisineService ]
})
export class BookedCuisinesModule {}