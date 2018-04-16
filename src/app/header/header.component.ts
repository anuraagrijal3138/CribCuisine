import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggleMenu = false;
  constructor(private authService: AuthService,
              private authGuard:AuthGuardService,
              private router: Router) {
              }
              
      logout(){
        this.authService.singOut();
        this.router.navigateByUrl('/home');
      }

      onToggleMenu() {
        this.toggleMenu = !this.toggleMenu;
      }
}
