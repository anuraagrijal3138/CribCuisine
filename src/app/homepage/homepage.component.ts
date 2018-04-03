import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  email: Promise<String>;
  constructor(private authService: AuthService,
              private router: Router) {
                
               }

  signInWithGoogle() {
    this.email= this.authService.signInWithGoogle()
      .then(function (success){
        console.log("success printing");
        console.log(success);
        //check if the user is a howard student?
        if (success.user.email.endsWith("howard.edu")) {
          console.log("Will grant the access");
          return success.user.email;
          
        } else {
          return Promise.reject(new Error('not a Bison'))

        }
      })
      .catch(function (error){
        console.log("singInwithGoogle Error: "+error)
        return Promise.reject(new Error('not a Bison'))
      });

  
    }
    login(){
      this.signInWithGoogle();
      this.email.then(
        (success)=>{
          console.log('under login navigation');
          this.router.navigateByUrl("/cuisines").then(
            (success) => console.log("successfull navigation")
          )
        }
      ).catch(
        (error) =>{
          this.authService.singOut;
          window.alert("This is a Bison Privelege, try with howard email")
          this.router.navigateByUrl("/").then(
            (success) => {console.log("successfully rejected routing")
              this.authService.delete()
                .then(
                  (success) => {
                    console.log("user was deleted sucessuflly")
                    window.alert("This is a Bison Privelege, use your Howard Email")
                  }
                ).catch(
                  (failure) => console.log("failed to delete current user")
                )
          }
          )}
      )
    }
  }
