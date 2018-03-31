import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// for import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase} from 'angularfire2/database';

export class Cuisine {

  constructor(
    public name: string,
    public intro: string,
    public image: string
  ) {  }

}

@Component({
  selector: 'app-cuisine-form',
  templateUrl: './cuisine-form.component.html',
  styleUrls: ['./cuisine-form.component.css']
})
export class CuisineFormComponent implements OnInit {
	
	model  = new Cuisine('name', 'Intor', 'Chuck Overstreet');
	submitted = false;

	constructor( db: AngularFireDatabase) {		
			console.log(db);
			const itemsRef = db.list('data');
			itemsRef.push({ name: "tried from database" });				
		
	}
	onSubmit() {


	}
	

  ngOnInit() {
		this.submitted = false;	
  }

}
