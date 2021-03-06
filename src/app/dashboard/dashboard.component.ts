import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CuisinesService } from '../cuisines/cuisines.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: String;
  notifications : Observable<any[]>;
  booked: Observable<any[]>;
  isEmpty:boolean = true;
  constructor(private authService: AuthService,
              private router: Router,
              private cuisinesService: CuisinesService) {
                this.userName = this.authService.auth.currentUser.displayName;
                console.log(this.notifications);
              }

  
  ngOnInit() {
    this.notifications = this.cuisinesService.notification;
    this.booked = this.cuisinesService.bookedCuisines;
    this.cuisinesService.bookedCuisines
			.subscribe(
				(message : any) => {
					if(message.length > 0){
            this.isEmpty = false;
          }
				}
			);
  }
}
