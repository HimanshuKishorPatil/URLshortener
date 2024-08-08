import { Component, ElementRef, HostBinding, Renderer2, ViewChild } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { GenerateShortUrlService } from '../../services/generate-short-url.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-url',
  templateUrl: './new-url.component.html',
  styleUrl: './new-url.component.css'
})
export class NewURLComponent {
  inputValue: String = ''


  @HostBinding('class.dark-mode') darkMode: boolean = false;


  longurl: string = "";

  ngOnInit() {
    this.updateDarkMode();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.updateDarkMode.bind(this));

  }


  updateDarkMode(event?: MediaQueryListEvent) {
    this.darkMode = window.matchMedia('(prefer-color-scheme: dark)').matches;

  }

  constructor(public historyService: HistoryService, public generateShortUrlService: GenerateShortUrlService, private loginService: LoginService, private renderer: Renderer2, private toastr: ToastrService) { }


  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("copied")
  }
  async paste() {
    this.longurl = await navigator.clipboard.readText();
  }
  async generteShortUrl(): Promise<void> {

    // console.log(this.loginService.loggedInUser?.GUID)
    const data = {
      "UUID": this.loginService.loggedInUser?.GUID,
      "originalURL": this.longurl
    }
    // console.log(data)
    const verified: boolean = this.generateShortUrlService.verifyURL(this.longurl)
    // console.log(verified)



    if (verified) {
      // const alreadyexist: boolean = this.generateShortUrlService.isExist(this.longurl)
      // console.log(alreadyexist)
      // if (alreadyexist) {
      //   alert("already exist")
      // }
      // else {
      await this.generateShortUrlService.generateShortURL(data);
      this.generateShortUrlService.showURL()
      // console.log("reached")
      // }

    }
    else {
      alert("invalid URL")
    }

  }

  changeDarkMode() {
    
     const bg=Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
     const iTag= Array.from(document.getElementsByTagName('i') as HTMLCollectionOf<HTMLElement>) 
     if (bg != null) {
        var i;
        for (i = 0; i < bg.length; i++) {
          bg[i+1].style.setProperty("background-color", "black")
          iTag[1].style.setProperty(   "color", "white" )
        }
      
      }
    
  }

  changeLightMode(){
    const bg=Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    const iTag= Array.from(document.getElementsByTagName('i') as HTMLCollectionOf<HTMLElement>) 
    const button=Array.from(document.getElementsByTagName('button')as HTMLCollectionOf<HTMLElement>)
    if (bg != null) {
      var i;
      for (i = 0; i < bg.length; i++) {
        bg[i+1].style.setProperty("background-color", "white")
        iTag[1].style.setProperty(   "color", "black" )
       
      }
    
    }

  }

  // @media (prefers-color-scheme:dark){
  //   .body{
  //       background-color: black;
  //   }
  //   i:hover{
  //       color: white; 
  //   }
  //   #generateUrlButton button:hover{
  //       /* box-shadow:  0 0 2px 0 black; */
  //       background-color: white;
  //       color: black;
  //   }
  //     }
}
