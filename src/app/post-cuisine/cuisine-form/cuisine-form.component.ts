import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {StorageService } from '../../storage.service';


//import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cuisine-form',
  templateUrl: './cuisine-form.component.html',
  styleUrls: ['./cuisine-form.component.css']
})
export class CuisineFormComponent {

  files: FileList;
  uid: any;
  newPostKey: any;

  
	constructor(private authService: AuthService,
              private router: Router
              ) {  }

  onChange(files: FileList) {
    console.log('underfileOnCSshanges');
    this.files = files;
    console.log(this.files.item(0));
  }

  onSubmit(singleCuisine) { 
    
    this.writeNewPost
        (this.authService.auth.currentUser.uid, singleCuisine.value.name, 
          singleCuisine.value.intro, singleCuisine.value.hostingtime, singleCuisine.value.price)
          .then((success) => {
            // this.uploadToStorage(this.uid,this.newPostKey).then((success)=>console.log(success))
              // .catch((error)=>console.log(error));
            this.router.navigateByUrl('/cuisines');
          }
        ).catch((error)=> {
          console.log(error);
          this.router.navigateByUrl('/home');
        });
  }

writeNewPost(uid, name, intro, time, price) {
  // Get a key for a new Post.
  var newPostKey = this.authService.db.ref().child('cuisines').push().key;
  var hostname = this.authService.auth.currentUser.displayName;
  var hostImage = this.authService.auth.currentUser.photoURL;
  var hostMetadata = this.authService.auth.currentUser.metadata;
  //var rating = this.authService.auth.currentUser.

  // A post entry.
  var postData = {
    name: name,
    uid: uid,
    intro: intro,
    hostingtime: time,
    price : price,
    imgPostKey : newPostKey,
    hostName : hostname,
    hostImage: hostImage,
    hostMetadata: hostMetadata
    };

  this.newPostKey = newPostKey;
  this.uid = uid;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/cuisines/' + newPostKey] = postData;
  updates['/user-cuisines/' + uid + '/' + newPostKey] = postData;

  console.log(this.files); 

  //https://firebase.google.com/docs/storage/web/upload-files
  var rootref = this.authService.getStorageRef();
  var cref = rootref.child('/cuisines/' + newPostKey);
  var uref = rootref.child('/user-cuisines/'+uid+'/'+ newPostKey);

  var file = this.files.item(0);

  cref.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
    });

  uref.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
    });
  
  return this.authService.db.ref().update(updates);

  } 

}
