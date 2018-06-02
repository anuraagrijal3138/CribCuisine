import { switchMap } from 'rxjs/operators';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';



import {  CuisineService }  from './cuisine.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero$ | async as hero">
    <h3>"{{ hero.name }}"</h3>
    <div>
      <label>Id: </label>{{ hero.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes(hero)">Back</button>
    </p>
  </div>
  `,
  
})
export class CuisineDetailComponent implements OnInit {
  
  hero$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CuisineService
  ) {}

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getCuisine(params.get('id')))
    );
  }

  gotoHeroes(hero: any) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
}
