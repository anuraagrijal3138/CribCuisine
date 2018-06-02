import { switchMap } from 'rxjs/operators';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';



import {  HostedCuisineService }  from './hosted-cuisine.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="cuisine$ | async as cuisine">
    <h3>"{{ cuisine.cuisineName }}"</h3>
    <div>
      <label>Id: </label>{{ cuisine.dormName }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="cuisine.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes(cuisine)">Back</button>
    </p>
  </div>
  `,
  
})
export class HostedCuisineDetailComponent implements OnInit {
  
  cuisine$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HostedCuisineService
  ) {}

  ngOnInit() {
    this.cuisine$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getCuisine(params.get('imgPostKey')))
    );
  }

  gotoHeroes(cuisine: any) {
    let cuisineId = cuisine ? cuisine.id : null;
    // Pass along the cuisine id if available
    // so that the HeroList component can select that cuisine.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/cuisines', { id: cuisineId, foo: 'foo' }]);
  }
}
