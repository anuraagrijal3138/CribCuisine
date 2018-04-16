import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [MatInputModule,  
    MatStepperModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule],
  exports: [MatInputModule, 
    MatStepperModule, 
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule],
})
export class Material { }