import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { MsalService } from '@azure/msal-angular';
import { response } from 'express';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'urlshortener';
 
  constructor(public loginService:LoginService, private msalService:MsalService){}
  login() {
    // alert("clicked");
    // this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
    //   this.msalService.instance.setActiveAccount(response.account)
    // });
    // alert("clicked");
  } 
}
