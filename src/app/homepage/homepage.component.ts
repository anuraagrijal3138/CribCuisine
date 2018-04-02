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
    this.authService.signInWithGoogle()
    .then((res) => {
      this.userEmail = res.additionalUserInfo.profile.email;
      if (this.userEmail.endsWith("howard.edu")) {
        this.router.navigate(['cuisines'])
      } else {
        console.log("Error bhayo");
        this.router.navigate([''])
      }        
      })
    .catch((err) => console.log(err));
  }


}
