import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CuisinesService } from './cuisines.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-cuisines',
	templateUrl: './cuisines.component.html',
	providers: [ CuisinesService ],
  styleUrls: ['./cuisines.component.css']
})
export class CuisinesComponent {
	selectedCuisine: any;

	constructor(private cuisinesService: CuisinesService){
		// console.log("asasas");
		// cuisinesService.getCuisines().subscribe(val => console.log(val));
		// console.log(cuisinesService.getCuisines());
		
	}
	ngOnInit() {
		this.cuisinesService.cuisineSelected
			.subscribe(
				(cuisine : any) => {
					this.selectedCuisine = cuisine;
				}
			);
	}
}

