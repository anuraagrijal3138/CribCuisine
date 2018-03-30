import { Component, OnInit, Input } from '@angular/core';
import { CuisinesService } from '../../cuisines.service';
import { Observable } from 'rxjs/Observable';

import { Cuisine } from '../../cuisine.model';

@Component({
  selector: 'app-cuisine-item',
  templateUrl: './cuisine-item.component.html',
  styleUrls: ['./cuisine-item.component.css']
})
export class CuisineItemComponent implements OnInit {
  
  @Input() cuisine: any;
  
  constructor(private cuisinesService: CuisinesService) {}

  ngOnInit() {
  }

  onSelected() {
    console.log(this.cuisine);
    this.cuisinesService.cuisineSelected.emit(this.cuisine);
  }

}
