import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { NotificationsComponent }    from './notifications.component';

import { NotificationsService } from './notifications.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  providers: [ NotificationsService ]
})
export class NotificationsModule {}