import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuisinesComponent } from './cuisines/cuisines.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component: HomepageComponent },
    { path: 'post-ads', component: PostCuisineComponent },
    { path: 'cuisines',
        canActivate: [AuthGuardService],
        component: CuisinesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}