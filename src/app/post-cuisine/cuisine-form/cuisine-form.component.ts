<<<<<<< HEAD
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
// for import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase} from 'angularfire2/database';
=======
 import { Component,  Output, EventEmitter, ViewChild} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireObject, AngularFireList, AngularFireDatabase} from 'angularfire2/database';


//import { Component, OnInit, ViewChild } from '@angular/core';
>>>>>>> b0ac34d1233a9f4f69b411cb385fa153ad28848e
import { NgForm } from '@angular/forms';

export class Cuisine {

  constructor(
    public name: string,
    public intro: string,
    public image: string
  ) { }

}

@Component({
  selector: 'app-cuisine-form',
  templateUrl: './cuisine-form.component.html',
  styleUrls: ['./cuisine-form.component.css']
})
<<<<<<< HEAD
export class CuisineFormComponent implements OnInit {
	// cuisinesRef: AngularFireList<any>;
	// cuisines: Observable<any[]>;	
	submitted: boolean;

  @ViewChild('cuisineForm') singleCuisine: NgForm;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

	constructor( db: AngularFireDatabase) {	
		this.itemsRef = db.list('data');
    this.items = this.itemsRef.valueChanges();
    console.log(this.items);
		//  this.cuisines = this.cuisinesRef.valueChanges().map(changes => {
		// 	 return changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
		//  });
		//  console.log(this.singleCuisine);
	//  }

	//  addItem(newName : any) {
	// 	 this.cuisinesRef.push({ name: newName });

	// 	 }
  }
  ngOnInit() {
		this.submitted = false;	
  }
  onSubmit() { 
    this.submitted = true;
		this.itemsRef.push(this.singleCuisine.value);
  }
}
=======

export class CuisineFormComponent {
	

	cuisinesRef: AngularFireList<any>;
	cuisines: Observable<any[]>;	
	submitted: boolean;

  @ViewChild('cuisineForm') singleCuisine: NgForm;
	 
	constructor( db: AngularFireDatabase) {	
		 this.cuisinesRef = db.list('data');
		 this.cuisines = this.cuisinesRef.valueChanges().map(changes => {
			 return changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
		 });
		 console.log(this.singleCuisine);
	 }

	 addItem(newName : any) {
		 this.cuisinesRef.push({ name: newName });

		 }
		

  onSubmit() { 
    this.submitted = true;
		//console.log(this.singleCuisine.value);
		this.addItem('fdafkldk  ofasoid');	
		//const itemsRef = this.db.list('data');
		//itemsRef.push({ });	
  }

  // ngOnInit() {
  //   this.submitted = false;
  // }

}
>>>>>>> b0ac34d1233a9f4f69b411cb385fa153ad28848e
