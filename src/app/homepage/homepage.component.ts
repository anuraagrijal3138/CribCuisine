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
export class HomepageComponent implements OnInit {
  email: Promise<String>;
  images: Array<string>;

  constructor(private authService: AuthService,
              private router: Router,
              config: NgbCarouselConfig, private _http: HttpClient) {
                config.interval = 800;
                config.wrap = true;
                config.keyboard = true;
                
               }

  //carousel 
  ngOnInit() {
    this._http.get('https://picsum.photos/list')
        .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
        .subscribe(images => this.images = images);
  }

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
    
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
