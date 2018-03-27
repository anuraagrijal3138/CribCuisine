import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';


import { AppComponent } from './app.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { CuisineListComponent } from './cuisines/cuisine-list/cuisine-list.component';
import { CuisineDetailComponent } from './cuisines/cuisine-detail/cuisine-detail.component';
import { CuisineItemComponent } from './cuisines/cuisine-list/cuisine-item/cuisine-item.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ServerService } from './server.service';
import { CuisineFormComponent } from './post-cuisine/cuisine-form/cuisine-form.component';


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
    CuisineFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpModule,
		FormsModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
