import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireModule, FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { throws } from 'assert';
import { environment } from '../environments/environment';


@Injectable()
export class AuthService {
  //https://www.youtube.com/watch?v=-OKrloDzGpU
  auth:   	firebase.auth.Auth;
  db:		    firebase.database.Database;

  constructor(){
    
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
  }
    this.auth = firebase.auth();
    this.db = firebase.database();

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
      } else{
        console.log('not logged in');
      }
    })
  }

  getStorageRef(){
    var storageRef = firebase.storage().ref();
    return storageRef;
  }

  signInWithGoogle(){
      const promise = this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return promise;
  }

  singOut(){
    return this.auth.signOut();
  }

  delete(){
    console.log("Bigro inside delete function");
    if(this.auth.currentUser){
      return this.auth.currentUser.delete();
    }
    return Promise.reject(new Error('there is no active user'));
  }

}


