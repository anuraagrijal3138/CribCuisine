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

  

}
