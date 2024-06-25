import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class ModifyUrlService {

  constructor(private httpClient:HttpClient,private historyService:HistoryService) { }

  delete(url: any) {
   const data={
      "longUrl":url
    }
   this.httpClient.post("http://localhost:3000/deleteUrl/",data).subscribe((resultData:any)=>{
    if(resultData)
          alert("deleted");
          this.historyService.getHistory()
          
   })
  }
  modify(newUrl:any) {
    const modifyUrlData={
      "oldUrl":"",
      "newUrl":newUrl
    }
    this.httpClient.post("http://localhost/updateUrl/",modifyUrlData).subscribe((resultData:any)=>
    {
      if(resultData.status){
             alert("success")

      }else{
        alert("fail")
      }
    })
  }

}
