import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  {
  email: Promise<String>;
  images: Array<string> = ['./../../assets/images/4.jpg', './../../assets/images/2.jpg', './../../assets/images/3.jpg'];

  constructor(private authService: AuthService,
              private router: Router,
              config: NgbCarouselConfig, private _http: HttpClient) {
                config.interval = 800;
                config.wrap = true;
                config.keyboard = true;
                
               }




  

  signInWithGoogle()  {
    this.email= this.authService.signInWithGoogle()
      .then((success) => {
        console.log("success printing");
        console.log(success);
        //check if the user is a howard student?
        if (success.user.email.endsWith("howard.edu")) {
          console.log("Will grant the access");
          return Promise.resolve(success.user.email);
          
        } else {
          return Promise.reject(new Error('not a Bison'))

        }
      })
      .catch((error) => {
        console.log("singInwithGoogle Error: "+error)
        return Promise.reject(new Error('not a Bison'))
      });

      return this.email;
    }


    login(){
      this.signInWithGoogle().then(
        (success)=>{
          console.log('under login navigation');
          this.router.navigateByUrl("/cuisines").then(
            (success) => console.log("successfull navigation")
          ).catch(
            (error) => console.log("cannot perform navigation")
          )
        }
      )
      .catch(
        (error) =>{
          this.authService.delete()
                .then(
                  (success) => {
                    console.log("user was deleted sucessuflly")
                    window.alert("This is a Bison Privelege, use your Howard Email")
                    this.router.navigateByUrl("/").then(
                      (success) => {
                        console.log("successfully rejected routing")
                      }).catch(
                        (error) => {
                          console.log("Navigation Failed");
                        }
                      );
                      
                  }
                ).catch(
                  (failure) => console.log("failed to delete current user")

                );
              }
              );
    }
}
