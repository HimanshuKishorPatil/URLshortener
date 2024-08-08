import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateShortUrlService {

  shortUrl = "";
  generatedurl: boolean = false;
  isUrlAlreadyExist: boolean=true;
  showURL() {
    this.generatedurl = true;
  }
  close() {
    this.generatedurl = false;
  }

  constructor(private httpClient: HttpClient) {

  }
  async generateShortURL(data: any): Promise<any> {

    return await this.httpClient.post<any>("http://localhost:3000/generateshortUrl", data).subscribe((resultData: any) => {

      this.shortUrl = resultData[0].response;
      return this.shortUrl
    })

  }
  verifyURL(uri: any): boolean {

    try {
      new URL(uri);
      return true;
    } catch (err) {
      this.shortUrl = "You have Entered Invalid Url"
      alert(this.shortUrl)
      return false;
    }
  }



  isExist(longUrl: any): boolean {
    this.httpClient.get("http://localhost:3000/generateshortUrl/:" + longUrl).subscribe((resultData: any) => {
         if(resultData){
             this.isUrlAlreadyExist=true
         }
         else{
             this.isUrlAlreadyExist=false
         }
    })
   return this.isUrlAlreadyExist
  }




}
