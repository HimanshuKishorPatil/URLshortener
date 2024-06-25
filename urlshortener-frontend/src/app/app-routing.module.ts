import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewURLComponent } from './components/new-url/new-url.component';
import { UserURLsComponent } from './components/user-urls/user-urls.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { MsalGuard } from '@azure/msal-angular';
import { auth } from 'firebase';

const routes: Routes = [
  {path:"login", component:LoginComponent, },
 
  {path:"home", component:NewURLComponent,canActivate:[AuthGuard]},
  {path:"userURLs", component:UserURLsComponent,canActivate:[AuthGuard]},

  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:"**", component:PageNotFoundComponent},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
