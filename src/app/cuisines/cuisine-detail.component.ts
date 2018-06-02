import { switchMap } from 'rxjs/operators';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

// TODO import { slideInDownAnimation } from '../animations';
//TODO: Define Cuisine in cusine.service or on a separte file and export it so it can be imported here
import { CuisineService }  from './cuisine.service';

@Component({
  template: `
  <h2>CUISINES1</h2>
  <p>{{cuisi}}</p>
  <div *ngIf="cuisine$ | async as cuisine">
    <h3>"{{ cuisine.cuisineName }}"</h3>
    <h3>"{{ cuisine.dormName }}"</h3>
    <div>
      <label>Id: </label>{{ cuisine.imgPostKey }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="cuisine.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoCuisines(cuisine)">Back</button>
    </p>
  </div>
  `//,
  //animations: [ slideInDownAnimation ]
})
export class CuisineDetailComponent implements OnInit {
//   @HostBinding('@routeAnimation') routeAnimation = true;
//   @HostBinding('style.display')   display = 'block';
//   @HostBinding('style.position')  position = 'absolute';

  //TODO : Observable<cuisine>
  cuisine$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CuisineService
  ) {}

  ngOnInit() {
    console.log(this.cuisine$);
    this.cuisine$ = this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) =>
        this.service.getCuisine(params.get('imgPostKey'))
      )
       
    );
    console.log(this.cuisine$);
  }

  //TODO cuisine: Cuisine
  gotoCuisines(cuisine: any) {
    let cuisineId = cuisine ? cuisine.imgPostKey : null;
    // Pass along the cuisine id if available
    // so that the CuisineList component can select that cuisine.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/cuisines', { id: cuisineId, foo: 'foo' }]);
  }
}