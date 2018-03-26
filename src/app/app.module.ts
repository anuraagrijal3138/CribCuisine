import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { CuisineListComponent } from './Cuisines/cuisine-list/cuisine-list.component';
import { CuisineDetailComponent } from './Cuisines/cuisine-detail/cuisine-detail.component';
import { CuisineItemComponent } from './cuisines/cuisine-list/cuisine-item/cuisine-item.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    CuisinesComponent,
    CuisineListComponent,
    CuisineDetailComponent,
    CuisineItemComponent,
    PostCuisineComponent,
    HeaderComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
