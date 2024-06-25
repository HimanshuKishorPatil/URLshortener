
import { Component, HostListener, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser/dist/response/AuthenticationResult';
import { OtpService } from '../../services/otp.service';
import { RegisterService } from '../../services/register.service';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ToastrService } from 'ngx-toastr';

import { Subject, filter, pipe, takeUntil, throwError } from 'rxjs';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';

import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';

import { Router } from '@angular/router';




@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',


})
export class LoginComponent implements OnInit, OnDestroy {

  // @HostListener('document:click', ['$event'])

  // documentClick(event: MouseEvent) {

  // }
  user: any
  private accessToken = '';
  newUsername = "";
  newPassword: string = "";
  confirmNewPassword: string = "";
  username: string = "";
  password: string = "";
  otp: Number = 0;



  isPasswordRulesVisible: boolean = false;
  otpVerification: boolean = false;
  isSignUp: boolean = false;
  isResetPasswordOpen: boolean = false;
  isUserLoggedIn: boolean = false;
  view: boolean = false;
  private readonly _destroy = new Subject<void>();



  constructor(private authGService: SocialAuthService,
    private router: Router,
    // microsoft azure
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService,
    public authService: MsalService,
    public msalService: MsalService,


    private toastr: ToastrService,

    public loginService: LoginService,
    private otpService: OtpService,
    private registerService: RegisterService,
    public resetPasswordService: ResetPasswordService,




  ) {
    this.loginService.isLoggedIn = false;
  }

  ngOnInit(): void {

    // Google oninit
    this.authGService.authState.subscribe(async (user) => {
      this.loginService.isLoggedIn = (user != null);
      if (user != null) {
        // localStorage.setItem('isLoggedIn', "true");
       
        // console.log(user.id)
        await this.loginService.signInWithGoogle(user.id)
        this.router.navigate(["/home"])
      }

    });





    // microsoft oninit
    this.msalBroadCastService.inProgress$.pipe
      (filter((interactionStatus: InteractionStatus) =>
        interactionStatus == InteractionStatus.None), takeUntil(this._destroy)).subscribe(x => {
          this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0
        })
  }

  ngOnDestroy(): void {
    // destroying msal subcription
    this._destroy.next(undefined);
    this._destroy.complete()
    this.authGService.signOut();

  }
  

  async login(): Promise<void> {

    const userData = {
      "username": this.username,
      "password": this.password
    };

    // console.log(userData);
    (await this.loginService.login(userData)).subscribe()
    
   
  }

  // password view
  viewPass() {
    this.view = !this.view

  }

  openSignupMenu() {

    this.isSignUp = true;
  }

  alreadyAccount() {
    this.isSignUp = false;
  }

  showPasswordSpecification() {
    this.isPasswordRulesVisible = !this.isPasswordRulesVisible
  }



  // google sign in
  refreshToken(): void {
    this.authGService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  getAccessToken(): void {
    this.authGService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }
  // *****************************************************************************************************************

  // microsoft
  msisLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null
  }
  maslogin() {

    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest)
    }
    else {
      this.authService.loginRedirect();
    }
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
    });

  }



  // *****************************************************************************************************************
  // New Sign in
    async generateOtp() {
    const data = {

      "username": this.newUsername,
      "user_type": "Email"
    }
    // console.log(this.otpService.isUsernameAlreadyExist)

    this.otpService.verifyNewUsernameAlreadyExist(this.newUsername)
    // console.log(this.otpService.isUsernameAlreadyExist)
 
  }

  verifyOtp() {
    const data = {
      "username": this.newUsername,
      "otp": this.otp
    }
    // console.log(data)
    this.otpService.verify(data)
  }

  register() {

    // password logic
    if (this.newPassword != this.confirmNewPassword) {
      alert("password mismatch")
    }
    else {
      const user = {
        "username": this.newUsername,
        "password": this.newPassword,
        "token": "null",
        "user_type": "Email"
      }
      // console.log(user)
      this.registerService.register(user)
    }

  }

  // *****************************************************************************************************************

  // Reset password
  openResetPassword() {
    this.isResetPasswordOpen = true;
  }
  closeResetPassword() {
    this.isResetPasswordOpen = false;
  }
  resetPassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      alert("password mismatch")
    }
    else {
      const userData = {
        "username": this.newUsername,
        "password": this.newPassword
      }
      // console.log(userData)

      this.resetPasswordService.resetPassword(userData)
    }




  }


}