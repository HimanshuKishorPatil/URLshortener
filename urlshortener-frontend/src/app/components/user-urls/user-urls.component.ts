import { Component } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { ModifyUrlService } from '../../services/modify-url.service';
import { GenerateShortUrlService } from '../../services/generate-short-url.service';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from '../../footer/footer.component';
@Component({
  selector: 'app-user-urls',
  templateUrl: './user-urls.component.html',
  styleUrl: './user-urls.component.css'
})
export class UserURLsComponent {

  newUrl: String = "";
  edit: boolean = false;
  isResultLoaded: boolean = true;
  p = 1;
  constructor(public historyService: HistoryService, private modifyUrlService: ModifyUrlService, private generateShortUrlService: GenerateShortUrlService, private toastr: ToastrService) {


  }

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
  // modify
  modifyUrl(newUrl: any) {
    const isexist: boolean = this.generateShortUrlService.isExist(newUrl)
    if (isexist) {
      alert("sorry this url already exist in system")
    }
    else {
      this.modifyUrlService.modify(newUrl);
    }

  }
  editUrl(UrlData: any) {
    this.edit = true
  }
  closeEditor() {
    this.edit = false
  }
  // delete
  deleteUrl(urlData: any) {
    const longUrl = urlData.originalURL
    this.modifyUrlService.delete(longUrl)
    this.historyService.getHistory()
  }


  changeDarkMode() {

    const bg = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    var heading = <HTMLDivElement> document.getElementById("heading");

    const paginationCount = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    const paginationActive = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)

    if (bg != null) {
      var i;
      heading.style.setProperty("border-bottom", "4px solid rgb(244, 239, 239)")
        heading.style.setProperty("color", "white")
      
        bg[1].style.setProperty("background-color", "black")
        
      
    }


  }

  changeLightMode() {

    const bg = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    var heading = <HTMLDivElement> document.getElementById("heading");

    const paginationCount = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    const paginationActive = Array.from(document.getElementsByClassName('body') as HTMLCollectionOf<HTMLElement>)
    if (bg != null) {
      var i;
        heading.style.setProperty("border-bottom", "4px solid black")
        heading.style.setProperty("color", "black")
      // for (i = 0; i < bg.length; i++) {
        bg[1].style.setProperty("background-color", "white")
      
      // }
    }
  }

  //    .body{
  //     background-color: black;

  // }
  // #heading h3 {
  //     border-bottom: 4px solid rgb(244, 239, 239);
  //     color: white;
  // }
  // .my-pagination::ng-deep ul > li.disabled > span {
  //     /* background-color: brown !important; */
  //     border-color: white !important;
  //     color: white;
  //   }
  //  .my-pagination ::ng-deep ul > li:not(.active) > a {
  //     /* background-color: red !important; */
  //     border-color: white !important;
  //     color: white;
  //   }
}
  

