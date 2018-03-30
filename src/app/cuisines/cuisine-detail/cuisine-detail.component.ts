import { Component, OnInit, Input } from '@angular/core';
//import { Cuisine } from '../cuisine.model';

@Component({
  selector: 'app-cuisine-detail',
  templateUrl: './cuisine-detail.component.html',
  styleUrls: ['./cuisine-detail.component.css']
})
export class CuisineDetailComponent implements OnInit {
  @Input() cuisine: any;
  constructor() { }
  
  ngOnInit() {
  }

}
