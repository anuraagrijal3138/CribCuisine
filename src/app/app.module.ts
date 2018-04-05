import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//load the environment file that we edited
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { CuisineListComponent } from './cuisines/cuisine-list/cuisine-list.component';
import { CuisineDetailComponent } from './cuisines/cuisine-detail/cuisine-detail.component';
import { CuisineItemComponent } from './cuisines/cuisine-list/cuisine-item/cuisine-item.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { CuisineFormComponent } from './post-cuisine/cuisine-form/cuisine-form.component';

//database handle
import { AngularFireModule } from 'angularfire2';
import { CuisinesService } from './cuisines/cuisines.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostcuisinesComponent } from './dashboard/hostcuisines/hostcuisines.component';



@NgModule({
  declarations: [
    AppComponent,
    CuisinesComponent,
    CuisineListComponent,
    CuisineDetailComponent,
    CuisineItemComponent,
    PostCuisineComponent,
    HeaderComponent,
    HomepageComponent,
    CuisineFormComponent,
    DashboardComponent,
    HostcuisinesComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [CuisinesService, AuthGuardService, AngularFireDatabase, AngularFireDatabaseModule,
    AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
