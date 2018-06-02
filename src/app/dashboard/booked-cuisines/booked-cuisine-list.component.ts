// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//TODO: Define Cuisine in cusine.service or on a separte file and export it so it can be imported here
import {  BookedCuisineService }  from './booked-cuisine.service';
 
@Component({
  template: `
    <h2>CUISINES</h2>
    <ul class="items">
      <li *ngFor="let cuisine of cuisines$ | async"
        [class.selected]="cuisine.imgPostKey === selectedId">
        <a [routerLink]="['/cuisine', cuisine.imgPostKey]">
          {{ cuisine.cuisineName }}
        </a>
      </li>
    </ul>
 
  `
})
export class BookedCuisineListComponent implements OnInit {
  cuisines$: Observable<any[]>;
 
  private selectedId: string;
 
  constructor(
    private service: BookedCuisineService,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit() {
    this.cuisines$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = params.get('imgPostKey');
        console.log(params);
        return this.service.getCuisines();
        
      })
    );
  }
}