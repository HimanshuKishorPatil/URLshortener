import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from '../user/user.module';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocialUser } from '@abacritt/angularx-social-login';
import { ServerResponseType } from '@azure/msal-browser';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
   returnData:any=null;
  loggedInUser: UserModule | null = null;
  isLoggedIn: boolean = false;
errorMessage: string="";
  constructor(private httpClient: HttpClient, private router: Router, private toastr:ToastrService
  ) { }


  async login(bodyData: any): Promise<Observable<UserModule | null>> {
    
    return this.httpClient.post<any>("http://localhost:3000/login", bodyData, { observe: 'response' }).pipe(
      map((resultData) => {
        // console.log(resultData)
        if (resultData.status == 200) {
          this.loggedInUser = {
            GUID: resultData.body.UUID,
            user_type: resultData.body.user_type,
          };
         
          this.isLoggedIn = true;
          this.toastr.success("Login successful", "Welcome")
      
          this.router.navigate(['/home']);
          this.returnData=this.loggedInUser 
        }
        else{
          // this.toastr.error("invalid login", "try again")
          
        }
       return this.returnData
      }
      ),
      catchError(async (error) => this.handleError(error))
      
      )
  }
  handleError(error: any) {
    
    this.errorMessage="invalid credential"
    setTimeout(() => {
      this.errorMessage=""
    }, 4000);
    return null ;
  }
  // expect(resultData).toBeNull();
  // expect(service.isLoggedIn).toBeFalse();
  // expect(service.loggedInUser).toBeNull();
  // expect(toastrServiceSpy.error).toHaveBeenCalledWith('invalid login', 'try again');

  async signInWithGoogle(userId: any) {
    const data = {
      "userId": userId
    }

    await this.httpClient.post<any>("http://localhost:3000/signInWithGoogle", data).subscribe((resultData: any) => {
      if (resultData) {
        // console.log(resultData)
        this.loggedInUser = {
          GUID: resultData[0].UUID,
          user_type: resultData[0].user_type,

        }
        // localStorage.setItem('GUID', resultData[0].UUID);
        // localStorage.setItem('user_type',resultData[0].user_type)
        // localStorage.setItem('isLoggedIn', 'true');

      }



      this.router.navigate(["/home"])
      this.toastr.success("logged In successful")

      return this.loggedInUser
    }
    ), catchError(async (error) => this.handleError(error))
  }

}
