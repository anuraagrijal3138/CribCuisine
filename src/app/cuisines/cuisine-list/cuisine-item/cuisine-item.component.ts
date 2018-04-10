import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CuisinesService } from '../../cuisines.service';
import { Observable } from 'rxjs/Observable';

import { Cuisine } from '../../cuisine.model';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-cuisine-item',
  templateUrl: './cuisine-item.component.html',
  styleUrls: ['./cuisine-item.component.css']
})
export class CuisineItemComponent implements OnInit {
  //Input pass data from parent to child component
  @Input() cuisine: any;
  
  
  constructor(private cuisinesService: CuisinesService,
              public authService: AuthService) {      }

  ngOnInit() {
    
    var storageRef = this.authService.getStorageRef();

    console.log("This is type of cuisines");
    console.log(this.cuisine);

    storageRef.child('cuisines/'+this.cuisine.imgPostKey+'/').getDownloadURL()
      .then((url) => {
        this.cuisine.imgPostKey = url;
    }).catch(function(error) {
      // Handle any errors
      console.log(error)
    });
    
    console.log(this.cuisine);
  }

  onSelected() {
    console.log("onselected:")
    console.log(this.cuisine);
    this.cuisinesService.cuisineSelected.emit(this.cuisine);
  }

}
