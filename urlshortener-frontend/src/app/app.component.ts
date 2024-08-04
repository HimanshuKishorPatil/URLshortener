import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { MsalService } from '@azure/msal-angular';
import { response } from 'express';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @HostBinding('class.dark-mode') darkMode: boolean =false;
  title = 'urlshortener';

ngOnInit(){
  this.updateDarkMode();
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',this.updateDarkMode.bind(this));

}

  constructor(public loginService:LoginService, private msalService:MsalService){

  }
  updateDarkMode(event?: MediaQueryListEvent) {
    this.darkMode=window.matchMedia('(prefer-color-scheme: dark)').matches;
    
  }
 
  login() {
    // alert("clicked");
    // this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
    //   this.msalService.instance.setActiveAccount(response.account)
    // });
    // alert("clicked");
  } 
}
