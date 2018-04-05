import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuisinesComponent } from './cuisines/cuisines.component';
import { PostCuisineComponent } from './post-cuisine/post-cuisine.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostcuisinesComponent } from './dashboard/hostcuisines/hostcuisines.component';
//import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path:'home', component: HomepageComponent },
    { path: 'id/dashboard', component: DashboardComponent },
    { path: 'id/postcuisine', component: PostCuisineComponent},
    { path: 'id/cuisines', component: HostcuisinesComponent},
    { path: 'cuisines',
        //canActivate: [AuthGuardService],
        component: CuisinesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}