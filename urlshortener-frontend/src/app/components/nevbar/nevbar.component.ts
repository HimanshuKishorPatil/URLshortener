import { Component, NgModule } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';

import { GenerateShortUrlService } from '../../services/generate-short-url.service';
import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

// declare var handleSignout: any

@Component({

  selector: 'app-nevbar',
  templateUrl: './nevbar.component.html',
  styleUrl: './nevbar.component.css'
})
export class NevbarComponent {




  constructor(private loginService: LoginService, private historyService: HistoryService, private router: Router, private generateShortUrlService: GenerateShortUrlService, private toastr: ToastrService) {
    // console.log(this.loginService.loggedInUser?.user_type)
    // this.showHistory();
    setTimeout(() => {
      this.logout();
      this.toastr.show("session time out")
    }, 600000);
  }


  logout() {
    this.loginService.isLoggedIn = false;

    this.loginService.loggedInUser = null;
    this.router.navigate(["/"])


  }
  showHistory() {
    this.generateShortUrlService.close()
    this.historyService.showHistory();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  changeDarkMode() {

    const bg = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    const nm = Array.from(document.getElementsByClassName('name') as HTMLCollectionOf<HTMLElement>)
    const symbol = Array.from(document.getElementsByTagName('i') as HTMLCollectionOf<HTMLElement>)

    if (bg != null && nm != null && symbol != null) {
      bg[0].style.setProperty("background-color", "white");
      nm[0].style.setProperty("color", "black")
      symbol[0].style.setProperty("color", "black")


    }

  }

  changeLightMode() {
    const bg = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    const nm = Array.from(document.getElementsByClassName('name') as HTMLCollectionOf<HTMLElement>)
    const symbol = Array.from(document.getElementsByTagName('i') as HTMLCollectionOf<HTMLElement>)

    if (bg != null && nm != null && symbol != null) {
      bg[0].style.setProperty("background-color", "black");
      nm[0].style.setProperty("color", "white")
      symbol[0].style.setProperty("color", "white")
    }

  }

}
