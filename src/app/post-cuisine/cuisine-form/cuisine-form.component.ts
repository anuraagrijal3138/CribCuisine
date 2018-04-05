import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';




//import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-cuisine-form',
  templateUrl: './cuisine-form.component.html',
  styleUrls: ['./cuisine-form.component.css']
})
export class CuisineFormComponent {

  @ViewChild('cuisineForm') singleCuisine: NgForm;
	constructor(private authService: AuthService,
              private router: Router) {    }

  onSubmit() { 
    
    this.writeNewPost
        (this.authService.auth.currentUser.uid, this.singleCuisine.value.name, 
          this.singleCuisine.value.intro, this.singleCuisine.value.image, this.singleCuisine.value.hostingtime)
          .then((success)=>console.log("posted successfully")
        ).catch(()=>console.log("failed to post"));
  }

  writeNewPost(uid, name, intro, image, time) {
    // A post entry.
    var postData = {
      name: name,
      uid: uid,
      intro: intro,
      image: image,
      hostingtime: time
    };
  
    // Get a key for a new Post.
    var newPostKey = this.authService.db.ref().child('cuisines').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/cuisines/' + newPostKey] = postData;
    updates['/user-cuisines/' + uid + '/' + newPostKey] = postData;
  
    return this.authService.db.ref().update(updates);
  } 
}
