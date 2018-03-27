import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ServerService } from '../../server.service';
import { Cuisine } from './cuisine';


import { Cuisine } from '../cuisine.model';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.css']
})
export class CuisineListComponent implements OnInit {

  cuisines: Cuisine[];
	onGet(cu: any[]){
		console.log(cu);
	}

  constructor(private serverService: ServerService) { }

  ngOnInit() {
		this.serverService.getCuisines()
			.subscribe(
				(cuisines: Response) => this.cuisines = cuisines,
				(error) => console.log(error)
		);
  }

}
