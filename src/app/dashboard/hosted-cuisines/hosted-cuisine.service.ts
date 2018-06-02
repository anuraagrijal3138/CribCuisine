import { Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { map } from 'rxjs/operators';

//TODO: Define a Cuisine model and replace any with cuisine


@Injectable()
export class HostedCuisineService {

	
	CUISINES : Observable<any[]>;	

	constructor(db: AngularFireDatabase, as: AuthService){
		this.CUISINES = db.list('cuisines').valueChanges();
    }
    
    getCuisines() { 
        return this.CUISINES; 
    }
 
    getCuisine(id: string) {
        return this.getCuisines().pipe(
          // (+) before `id` turns the string into a number
          map(heroes => heroes.find(hero => hero.imgPostKey === id))
        );
      }
}