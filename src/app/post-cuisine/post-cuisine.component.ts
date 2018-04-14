import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-post-cuisine',
  templateUrl: './post-cuisine.component.html',
  styleUrls: ['./post-cuisine.component.css'],
  providers: [AngularFireAuth]
})
export class PostCuisineComponent implements OnInit{
  formGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder,private authService: AuthService,
    private router: Router ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          cuisineName: ['', Validators.required],
          description: ['', Validators.required],
          hostingDate: ['', Validators.required],
          hostingTime: ['', Validators.required],
          imageUrl: ['', Validators.required],
          price: ['', Validators.required] 
        }),
        this._formBuilder.group({
          dormName: ['', Validators.required],
          streetAddress1: ['', Validators.required],
          streetAddress2: ['', Validators.required],
          cityName: ['', Validators.required],
          stateName: ['', Validators.required]
        }),
        this._formBuilder.group({
          numberCust: ['', [Validators.required, Validators.min(1)]]
        }),
      ])
    });

  }
  onSubmit() {
    console.log(this.formGroup.value.formArray);
    
    console.log(this.formGroup.value.formArray[0]);
    var cuisineName = this.formGroup.value.formArray[0].cuisineName;
    var description = this.formGroup.value.formArray[0].description;
    var hostingDate = this.formGroup.value.formArray[0].hostingDate;
    var hostingTime = this.formGroup.value.formArray[0].imageUrl;
    var dormName =    this.formGroup.value.formArray[1].dormName;
    var streetAddress1 = this.formGroup.value.formArray[1].streetAddress1;
    var streetAddress2 = this.formGroup.value.formArray[1].streetAddress2;
    var cityName = this.formGroup.value.formArray[1].cityName;
    var stateName = this.formGroup.value.formArray[1].stateName;
    var numberCust = this.formGroup.value.formArray[2].numberCust;

    this.writeNewPost
    (this.authService.auth.currentUser.uid, cuisineName, description, hostingDate, hostingTime, dormName,
       streetAddress1, streetAddress2, cityName, stateName, numberCust)
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




writeNewPost(uid, cuisineName, description, hostingDate, hostingTime, dormName,
       streetAddress1, streetAddress2, cityName, stateName, numberCust){
  // Get a key for a new Post.
  var newPostKey = this.authService.db.ref().child('cuisines').push().key;
  var hostname = this.authService.auth.currentUser.displayName;
  var hostImage = this.authService.auth.currentUser.photoURL;
  var hostMetadata = this.authService.auth.currentUser.metadata;
  //var rating = this.authService.auth.currentUser.

  // A post entry.
  var postData = {
    cuisineName: cuisineName,
    uid: uid,
    description: description,
    hostingTime: hostingTime,
    hostingDate: hostingDate,
    dormName : dormName,
    streetAddress1: streetAddress1,
    streetAddress2: streetAddress2,
    cityName: cityName,
    stateName: stateName,
    numberCust: numberCust,
    imgPostKey : newPostKey,
    hostName : hostname,
    hostImage: hostImage,
    hostMetadata: hostMetadata
    };

  // this.newPostKey = newPostKey;
  // this.uid = uid;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/cuisines/' + newPostKey] = postData;
  updates['/user-cuisines/' + uid + '/' + newPostKey] = postData;

  //console.log(this.files); 

  //https://firebase.google.com/docs/storage/web/upload-files
  var rootref = this.authService.getStorageRef();
  var cref = rootref.child('/cuisines/' + newPostKey);
  var uref = rootref.child('/user-cuisines/'+uid+'/'+ newPostKey);

  //var file = this.files.item(0);

  // cref.put(file).then(function(snapshot) {
  //   console.log('Uploaded a blob or file!');
  //   });

  // uref.put(file).then(function(snapshot) {
  //   console.log('Uploaded a blob or file!');
  //   });
  
  return this.authService.db.ref().update(updates);

  } 


  
}
