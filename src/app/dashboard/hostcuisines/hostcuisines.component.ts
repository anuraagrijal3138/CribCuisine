import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
//import { CuisinesService } from '../../cuisines/cuisines.service';

@Component({
  selector: 'app-hostcuisines',
  templateUrl: './hostcuisines.component.html',
  styleUrls: ['./hostcuisines.component.css']
})
export class HostcuisinesComponent  {

  userName: String;
  hostSelectedCuisine: any;

  hostcuisines : Observable<any[]>;

  constructor(private authService: AuthService,
              //private cuisinesService: CuisinesService,
              private router: Router) {
                this.userName = authService.auth.currentUser.displayName;
                //this.hostcuisines = cuisinesService.usercuisines;
              }

  ngOnInit() {
    // this.cuisinesService.hostCuisineSelected
    //   .subscribe(
    //     (cuisine : any) => {
    //       this.hostSelectedCuisine = cuisine;
    //     }
    //   );
  }
}
