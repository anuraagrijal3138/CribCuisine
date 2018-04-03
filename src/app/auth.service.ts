import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  //code copied straight from : https://github.com/angular/angularfire2/blob/master/docs/version-4-upgrade.md
  user: Observable<firebase.User>;
  email : String;
  deleteU : boolean = false;

  constructor(private afAuth: AngularFireAuth, private af: AngularFireModule) {
    this.user = afAuth.authState;
  }

  //more about hd here: https://firebase.google.com/docs/auth/web/google-signin
  
  login() {
    var deleteUa = false;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()
    .setCustomParameters({
      'hd' :'bison.howard.edu'
     })).then(function(result){
        console.log(result);
        if (result.user.email.endsWith("howard.edu")) {
            console.log("inside result check");
        } else {
          console.log("failed reulult check");
          //delete function
          var user = firebase.auth().currentUser;
          user.delete().then(function() {
            // User deleted.
            console.log("This is a Bison Privelege Bruh");
          }).catch(function(error) {
            // An error happened.
            console.log("Cannot delte the user reason is: "+ error);
          });
          
        }    
     })

  }

  logout() {
     this.afAuth.auth.signOut();
  }

  //custom functions
  isLoggedIn(){
    return this.afAuth.authState;
  }

  // derieved from: https://firebase.google.com/docs/auth/web/manage-users
  deleteUser(){
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
      // User deleted.
      console.log("This is a Bison Privelege Bruh");
    }).catch(function(error) {
      // An error happened.
      console.log("Cannot delte the user reason is: "+ error);
    });
  }

  }
