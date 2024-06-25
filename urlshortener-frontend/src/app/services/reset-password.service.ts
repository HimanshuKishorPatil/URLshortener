import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient:HttpClient) { }

  resetPassword(userData:any) {
    this.httpClient.post("http://localhost:4200/resetPassword",userData).subscribe((resultData:any)=>{
      if(resultData){
      alert("success")
      }
      alert("fail")
    }
     
    )
  
    return true

  }
}
