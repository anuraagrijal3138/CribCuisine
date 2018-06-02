import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CuisinesModule } from './cuisines/cuisines.module';
//load the environment file that we edited
import { environment } from '../environments/environment';



import { AppComponent } from './app.component';
// import { CuisinesComponent } from './cuisines/cuisines.component';
// import { CuisineListComponent } from './cuisines/cuisine-list/cuisine-list.component';
// import { CuisineDetailComponent } from './cuisines/cuisine-detail/cuisine-detail.component';
import { CuisineItemComponent } from './cuisines/cuisine-list/cuisine-item/cuisine-item.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { CuisineFormComponent } from './post-cuisine/cuisine-form/cuisine-form.component';
import { Material } from './material.module';
//import { NgbdCarouselConfig } from './homepage/carousel-config';

//database handle
import { AngularFireModule } from 'angularfire2';
//import { CuisinesService } from './cuisines/cuisines.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostcuisinesComponent } from './dashboard/hostcuisines/hostcuisines.component';
import { HostHeaderComponent } from './host-header/host-header.component';
import { HostcuisinedetailsComponent } from './dashboard/hostcuisines/hostcuisinedetails/hostcuisinedetails.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';



@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    CuisinesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    Material,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    // CuisinesComponent,
    // CuisineListComponent,
    // CuisineDetailComponent,
    CuisineItemComponent,
    PostCuisineComponent,
    HeaderComponent,
    HomepageComponent,
    CuisineFormComponent,
    DashboardComponent,
    HostcuisinesComponent,
    HostHeaderComponent,
    HostcuisinedetailsComponent,
    //NgbdCarouselConfig,
  ],
  providers: [
    //CuisinesService, 
    AuthGuardService, AngularFireDatabase, AngularFireDatabaseModule,
    AuthService, AngularFireAuth
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
      console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
 }
