import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  userEmail:string = '';
  constructor(private authService:AuthService,
              private router:Router) {}

  signInWithGoogle() {
    //console.log(this.authService.isLoggedIn);
    this.authService.login();
    this.authService.user.subscribe(result =>
      {       
          if(result != null){
            this.router.navigateByUrl('/cuisines');
          }
          else{
            this.router.navigateByUrl('/home');
          }
      }
    );
  }


}
