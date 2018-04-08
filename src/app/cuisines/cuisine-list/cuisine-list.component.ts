import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CuisinesService } from '../cuisines.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.css'],

})
export class CuisineListComponent  {
	
	cuisines : Observable<any[]>;
	constructor(cuisinesService: CuisinesService){

		this.cuisines = cuisinesService.cuisines;
	}

}
