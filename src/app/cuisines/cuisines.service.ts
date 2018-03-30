import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

export interface Cuisine {
	name: string;
	intro: string;
	image: string;
}

@Injectable()
export class CuisinesService {

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


