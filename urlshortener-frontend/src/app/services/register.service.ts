import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promises } from 'dns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 isRegistered:boolean=false
  constructor(private httpClient:HttpClient) { }

  register(userdata:any):Observable<boolean> {
    // console.log(userdata)
     return this.httpClient.post("http://localhost:3000/register",userdata).pipe((resultData:any)=>{
      if(resultData){
      alert("success")
        this.isRegistered=true
        return resultData
     
      }
      alert("fail")
      this.isRegistered=false
      return resultData

    }
  
    )
  
  
  }

}
