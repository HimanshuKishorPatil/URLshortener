import { Injectable } from '@angular/core';
import { NewURLComponent } from '../components/new-url/new-url.component';
import { UserURLsComponent } from '../components/user-urls/user-urls.component';
import { FooterComponent } from '../footer/footer.component';
import { NevbarComponent } from '../components/nevbar/nevbar.component';

@Injectable({
  providedIn: 'root',
  
})
export class DarkLightModeService {
 async changeMode(lightmode: boolean) {
   
     if(!lightmode){
      await this.newUrlComponent.changeDarkMode();
      await this.userUrlComponent.changeDarkMode();
  //     this.nevbarComponent.changeDarkMode();
  //     console.log("reached heare")
     }
     else{
      await this.newUrlComponent.changeLightMode();
     await this.userUrlComponent.changeLightMode();
  //     this.nevbarComponent.changeLightMode();
     }
    
    
  }

  constructor(private userUrlComponent:UserURLsComponent, private newUrlComponent:NewURLComponent ){}

}
