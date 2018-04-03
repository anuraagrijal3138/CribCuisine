import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService  {

//   constructor(private router: Router,
//               private authService: AuthService) { }

//   canActivate() {
//     if  ( this.authService.authenticated ) {

//       return true;

//     }
//     else{
//     this.router.navigate(['/']);
//     return false;
//   }

// }
}