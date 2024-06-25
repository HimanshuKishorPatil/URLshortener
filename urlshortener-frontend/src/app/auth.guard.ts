import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
@Injectable({
  providedIn :'root'

})

export  class AuthGuard implements CanActivate{
 constructor(private router:Router,private loginService:LoginService) {
  
 }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.loginService.isLoggedIn == false){
    this.router.navigate(['/']);
    return false;
  }
  return true;
}
}
  



