import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  inputValue:String=''
 



  longurl: string = "";



  constructor(public historyService: HistoryService, public generateShortUrlService: GenerateShortUrlService, private loginService: LoginService,private renderer: Renderer2, private toastr:ToastrService) { }
 
 
  copyMessage(val: string){
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
}
