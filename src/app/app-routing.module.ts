import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuisinesComponent } from './cuisines/cuisines.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HomepageComponent } from './homepage/homepage.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component: HomepageComponent },
    { path: 'cuisines', component: CuisinesComponent },
    { path: 'post-ads', component: PostCuisineComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}