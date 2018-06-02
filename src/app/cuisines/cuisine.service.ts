import { Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

//TODO: Define a Cuisine model and replace any with cuisine


@Injectable()
export class CuisineService {

	
	CUISINES : Observable<any[]>;	

	constructor(db: AngularFireDatabase, as: AuthService){
		this.CUISINES = db.list('cuisines').valueChanges();
    }
    
    getCuisines() { 
        return this.CUISINES; 
    }
 
    getCuisine(id: string) {
        //console.log(id);
        return this.getCuisines().pipe(
        // (+) before `id` turns the string into a number
        
        map(cuisines => {
            //console.log(cuisines);
            cuisines.find(cuisine => cuisine.imgPostKey === id)
        })
        );
    }
}