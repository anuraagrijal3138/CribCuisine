import { Component, OnInit } from '@angular/core';

import { Cuisine } from '../cuisine.model';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.css']
})
export class CuisineListComponent implements OnInit {

  cuisines: Cuisine[] = [
    new Cuisine('Test Cuisine', 'Some cuisine informtion', 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Chicken_Momo_with_spicy_hot_curry.jpg'),
    new Cuisine('Test Cuisine', 'Some cuisine informtion', 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Chicken_Momo_with_spicy_hot_curry.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
