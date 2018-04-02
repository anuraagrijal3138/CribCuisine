import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService,
              private authGuard:AuthGuardService) {}

}
