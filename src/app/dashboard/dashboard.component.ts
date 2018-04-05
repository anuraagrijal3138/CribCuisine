import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: String;

  constructor(private authService: AuthService,
              private router: Router) {
                this.userName = this.authService.auth.currentUser.displayName;
              }

  
  ngOnInit() {
  }

}
