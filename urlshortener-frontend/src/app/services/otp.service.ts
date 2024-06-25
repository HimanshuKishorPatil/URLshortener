import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OtpService {



  otpSent: boolean = false;
  otpVerified: boolean = false;
  condition: boolean = true;
  isUsernameAlreadyExist: boolean = true;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }


  sendOtp(username: any): boolean {
    this.httpClient.post("http://localhost:3000/sendOtp", username).subscribe((resultData: any) => {
      if (resultData == true) {
        this.toastr.success("sent", "check the device")
        this.otpSent = true;

      }
      else {
        this.toastr.error("failed to send otp", "Try again")
        this.otpSent = false;

      }
    });
    return this.otpSent
  }
  verify(otp: any): boolean {
    this.httpClient.post("http://localhost:3000/verifyOtp", otp).subscribe((resultData: any) => {
      if (resultData) {

        this.otpVerified = true;
      }
      else {
        this.otpVerified = false;
      }
    });
    return this.otpVerified
  }
  verifyNewUsernameAlreadyExist(username: any):boolean{

    const body = {
      "username": username
    }

    this.httpClient.post("http://localhost:3000/verifyUser", body).subscribe((resultData: any) => {
      // console.log(resultData)
      this.isUsernameAlreadyExist = resultData.result
      // console.log(resultData.result)
      this.toastr.error("failed to send otp", "Username Already Exist")

     

    }),
      catchError(async (error) => this.handleError(error))


      return this.isUsernameAlreadyExist
}
handleError(error: any) {
  this.toastr.error("invalid login", "try again")
  return false;
}
}