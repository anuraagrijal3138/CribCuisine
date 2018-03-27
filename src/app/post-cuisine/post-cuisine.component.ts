import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ServerService } from '../server.service';
import { Cuisine } from './cuisine';

@Component({
  selector: 'app-post-cuisine',
  templateUrl: './post-cuisine.component.html',
  styleUrls: ['./post-cuisine.component.css']
})
export class PostCuisineComponent {


cuisineitem = {};
  constructor(private serverService: ServerService) {}

  onSave() {
    this.serverService.storeCuisine(this.cuisineitem)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
	
	onSubmitted(model: Cuisine){
		console.log(model);
		console.log(5);
		this.cuisineitem= model;
		this.onSave();

}
