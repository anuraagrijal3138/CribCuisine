import { Component, OnInit, EventEmitter} from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-post-cuisine',
  templateUrl: './post-cuisine.component.html',
  styleUrls: ['./post-cuisine.component.css']
})
export class PostCuisineComponent {
  cuisineSelected = new EventEmitter<any>();

	cuisines : Observable<any[]>;	
	constructor(db: AngularFireDatabase){
		console.log('now logging db');
		//console.log(db.collection('data'));
		this.cuisines = db.list('data').valueChanges();
	}

	getCuisines() { 
		console.log(this.cuisines);
		return this.cuisineSelected; 
	}
}
