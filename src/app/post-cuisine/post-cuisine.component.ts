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
  files: FileList;
  utc: string;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder,private authService: AuthService,
    private router: Router ) { 
      this.utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      console.log(this.utc);
    }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          cuisineName: ['', Validators.required],
          description: ['', Validators.required],
          hostingDate: ['', Validators.required],
          hostingTime: ['', Validators.required],
          price: ['', Validators.required ]
        }),
        this._formBuilder.group({
          dormName: ['', Validators.required],
          streetAddress1: ['', Validators.required],
          streetAddress2: [''],
          cityName: ['', Validators.required],
          stateName: ['', Validators.required]
        }),
        this._formBuilder.group({
          numberCust: ['', [Validators.required, Validators.min(1)]]
        }),
      ])
    });

  }

  onChange(event){
    console.log(event);
    this.files = event;
  }

  onSubmit() {
    console.log(this.formGroup.value.formArray);
    var militaryTime = this.formGroup.value.formArray[0].hostingTime;
    var time = this.formGroup.value.formArray[0].hostingTime;
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var timeValue;

    if (hours > 0 && hours <= 12)
    {
      timeValue= "" + hours;
    } else if (hours > 12)
    {
      timeValue= "" + (hours - 12);
    }
    else if (hours == 0)
    {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    console.log(this.formGroup.value.formArray[0]);
    var cuisineName = this.formGroup.value.formArray[0].cuisineName;
    var description = this.formGroup.value.formArray[0].description;
    var hostingDate = this.formGroup.value.formArray[0].hostingDate;
    var hostingTime = timeValue;
    var dormName =    this.formGroup.value.formArray[1].dormName;
    var streetAddress1 = this.formGroup.value.formArray[1].streetAddress1;
    var streetAddress2 = this.formGroup.value.formArray[1].streetAddress2;
    var cityName = this.formGroup.value.formArray[1].cityName;
    var stateName = this.formGroup.value.formArray[1].stateName;
    var numberCust = this.formGroup.value.formArray[2].numberCust;
    var price = this.formGroup.value.formArray[0].price;

    

    this.writeNewPost
    (this.authService.auth.currentUser.uid, cuisineName, description, hostingDate, hostingTime, dormName,
       streetAddress1, streetAddress2, cityName, stateName, numberCust, price, militaryTime)
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
       streetAddress1, streetAddress2, cityName, stateName, numberCust, price, militaryTime){
  // Get a key for a new Post.
  var newPostKey = this.authService.db.ref().child('cuisines').push().key;
  var hostname = this.authService.auth.currentUser.displayName;
  var hostEmail = this.authService.auth.currentUser.email;
  var hostImage = this.authService.auth.currentUser.photoURL;
  var hostMetadata = this.authService.auth.currentUser.metadata;
  
  //var rating = this.authService.auth.currentUser.


    //https://firebase.google.com/docs/storage/web/upload-files
    var rootref = this.authService.getStorageRef();
    var dbref = this.authService.db.ref();
    var cref = rootref.child('/cuisines/' + newPostKey);
    var uref = rootref.child('/user-cuisines/'+uid+'/'+ newPostKey);
  
    var file = this.files.item(0);
  
    return cref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      uref.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
        

        rootref.child('cuisines/'+newPostKey+'/').getDownloadURL()
        .then((url) => {
          console.log(url);
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
            hostEmail: hostEmail,
            hostMetadata: hostMetadata,
            price: price,
            imgUrl: url,
            remainingCapacity: numberCust,
            canAccomodateMore: true,
            hostingTimeMilitary: militaryTime
            };

          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates['/cuisines/' + newPostKey] = postData;
          updates['/user-cuisines/' + uid + '/' + newPostKey] = postData;

          dbref.update(updates).then((success)=>console.log("was a success"))
            .catch((err)=>console.log("error uploading on database"))

      }).catch(function(error) {
        // Handle any errors
        console.log(error)
      });
        
        });

      });

  } 
  
}
