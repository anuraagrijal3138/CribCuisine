import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  userEmail: string = '';
  constructor(private authService: AuthService,
    private router: Router) { }

  signInWithGoogle() {
    this.authService.googleLogin()
    .then((response)=>{
      console.log("Utsab dai we want your new album");
      console.log(typeof(response))
      if(response){
        this.router.navigateByUrl("/cuisines")
      }
      else{
        this.authService.delete;
      }
    })
      .catch((error)=>this.router.initialNavigation );
  }
}
  