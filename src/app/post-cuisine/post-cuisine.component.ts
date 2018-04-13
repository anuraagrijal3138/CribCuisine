import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          cuisineName: ['', Validators.required],
          discription: ['', Validators.required],
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
  }
}
