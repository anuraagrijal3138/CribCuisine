import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Cuisine } from './cuisines/cuisine.model';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}
  storeCuisine(cuisineitem: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://cribcuisine.firebaseio.com/data.json',
      cuisineitem,
      {headers: headers});
  }

	getCuisines(){
		return this.http.get('https://cribcuisine.firebaseio.com/data.json')
			.map(
				(response: Response) => {
					console.log(response);
					const data = response.json();
					var arr = $.map(data, function(el) { return el });
					console.log(arr);
					console.log('yo chai maal ...........');
					console.log(data);
					return arr;

	}
);
}
}
