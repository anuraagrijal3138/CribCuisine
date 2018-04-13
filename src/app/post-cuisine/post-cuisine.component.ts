import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

interface Foo {
    name:string,
    discription: string
    hostingDate:string
    hostingTime: string
    dormName: string
    streetAddress1: string
    streetAddress2: string
    city: string
    state: string
    postalCode: number
    totalCustomers: number
}

@Component({
  selector: 'app-post-cuisine',
  templateUrl: './post-cuisine.component.html',
  styleUrls: ['./post-cuisine.component.css'],
  providers: [AngularFireAuth]
})
export class PostCuisineComponent {
  let cuisineInfo = {} as Foo;
  constructor() {}
  onSubmit1(a) {
      // this.cuisineInfo.name = a.value.name;
      console.log(a.value.name);
      this.cuisineInfo.name = ;
      console.log(this.cuisineInfo);
  }
  onSubmit2(a) {
    console.log("from post cuisine component 2");
    
}
onSubmit3(a) {
  console.log("from post cuisine component 3");
  
}
}
