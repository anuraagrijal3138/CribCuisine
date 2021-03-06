import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-header',
  templateUrl: './host-header.component.html',
  styleUrls: ['./host-header.component.css']
})
export class HostHeaderComponent implements OnInit {
  toggleMenu=false;
  constructor(private authService:AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
  logout(){
    this.authService.singOut();
    this.router.navigateByUrl('/home');
  }

}
