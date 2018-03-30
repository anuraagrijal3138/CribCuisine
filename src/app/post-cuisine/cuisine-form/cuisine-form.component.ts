import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cuisine } from '../../cuisines/cuisine.model';

@Component({
  selector: 'app-cuisine-form',
  templateUrl: './cuisine-form.component.html',
  styleUrls: ['./cuisine-form.component.css']
})
export class CuisineFormComponent implements OnInit {
	
	model : Cuisine;

	submitted = false;
	@Output() onSubmitted = new EventEmitter<Cuisine>();	
	onSubmit() {

		this.submitted = true;
		console.log(this.model);
		this.onSubmitted.emit(this.model);
}
  constructor() { }
	

  ngOnInit() {
  }

}
