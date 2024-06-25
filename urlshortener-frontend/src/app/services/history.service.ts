import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  isViewHistory: boolean = false;
  URLsArray:any

  
  constructor(private httpClient: HttpClient,private loginService:LoginService) {
      this.getHistory()

   }


  async getHistory() {
        
       
    await this.httpClient.get("http://localhost:3000/getHistory/"+this.loginService.loggedInUser?.GUID).subscribe((resultData:any)=> {
      this.URLsArray = resultData;
    }
    )

  }
  showHistory() {
  //  console.log(this.loginService.loggedInUser?.GUID)
    this.getHistory();
    this.isViewHistory = !this.isViewHistory;
  }
}
