import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
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
import { CuisinesService } from './cuisines/cuisines.service';
import { CuisineFormComponent } from './post-cuisine/cuisine-form/cuisine-form.component';
import { AngularFireDatabase } from 'angularfire2/database';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpModule,
		FormsModule,
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
		
  ],
  providers: [CuisinesService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
