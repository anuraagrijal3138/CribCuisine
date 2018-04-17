import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { Cuisine } from './cuisine.model';


@Injectable()
export class CuisinesService {

	cuisineSelected = new EventEmitter<Cuisine>();
	hostCuisineSelected = new EventEmitter<Cuisine>();
	
	cuisines : Observable<any[]>;	
	usercuisines: Observable<any[]>;
	notification: Observable<any[]>;
	bookedCuisines: Observable<any[]>;

	constructor(db: AngularFireDatabase, as: AuthService){
		this.cuisines = db.list('cuisines').valueChanges();
		this.usercuisines = db.list('user-cuisines/'+as.auth.currentUser.uid).valueChanges();
		this.notification = db.list('users/'+as.auth.currentUser.uid+ '/notification').valueChanges();	
		this.bookedCuisines = db.list('users/'+as.auth.currentUser.uid+ '/bokedcuisines').valueChanges();
	}
}


