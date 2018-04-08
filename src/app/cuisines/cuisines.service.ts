import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

export interface Cuisine {
	name: string;
	intro: string;
	image: string;
}

@Injectable()
export class CuisinesService {

	cuisineSelected = new EventEmitter<any>();
	
	cuisines : Observable<any[]>;	
	usercuisines: Observable<any[]>;

	constructor(db: AngularFireDatabase, as: AuthService){
		this.cuisines = db.list('cuisines').valueChanges();
		this.usercuisines = db.list('user-cuisines/'+as.auth.currentUser.uid).valueChanges();
	}



}


