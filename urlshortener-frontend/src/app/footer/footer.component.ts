import { Component, OnInit } from '@angular/core';
import { NewURLComponent } from '../components/new-url/new-url.component';
import { UserURLsComponent } from '../components/user-urls/user-urls.component';
import { DarkLightModeService } from '../services/dark-light-mode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  constructor(private darkLightModeService:DarkLightModeService){}
  ngOnInit(): void {
    this.modeCheckerFunction()
  }
  lightmode=true  
  buttonActive(){
   const button= Array.from(document.getElementsByTagName("input"))
   var i;
  //  for(i=0;i<10;i++)
   button[1].click
  }

  async changeDarkLightMode() {
  this.lightmode=!this.lightmode
  console.log(this.lightmode)

 await this.darkLightModeService.changeMode(this.lightmode)

}

// darkmode connectivity to toggle button
modeCheckerFunction(){
  const query = window.matchMedia("(prefers-color-scheme:dark)")
  this.doCheck(query)// Call listener function at run time
  query.addListener(this.doCheck)// Attach listener function on state changes
}


doCheck(query:any) {
  console.log(query.matches)
  var element = <HTMLInputElement> document.getElementById("darkmode-toggle");

  if (query.matches) { // If media query matches
    // const button= Array.from(document.getElementsByTagName("input") as HTMLCollectionOf<HTMLElement>)
  element.checked=true
  } else {
    element.checked=false
  }
}

}
