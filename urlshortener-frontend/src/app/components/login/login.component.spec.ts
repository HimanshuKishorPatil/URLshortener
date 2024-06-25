import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from '../../services/otp.service';
import { RegisterService } from '../../services/register.service';
import { ResetPasswordService } from '../../services/reset-password.service';
import { of } from 'rxjs';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let authServiceSpy: jasmine.SpyObj<MsalService>;
  let authGServiceSpy: jasmine.SpyObj<SocialAuthService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let otpServiceSpy: jasmine.SpyObj<OtpService>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;
  let resetPasswordServiceSpy: jasmine.SpyObj<ResetPasswordService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let msalBroadcastServiceSpy: jasmine.SpyObj<MsalBroadcastService>
  beforeEach(() => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['login', 'signInWithGoogle']);
    const authServiceMock = jasmine.createSpyObj('MsalService', ['loginPopup', 'instance', 'getActiveAccount']);
    const authGServiceMock = jasmine.createSpyObj('SocialAuthService', ['authState', 'signOut', 'refreshAuthToken', 'getAccessToken']);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const otpServiceMock = jasmine.createSpyObj('OtpService', ['sendOtp', 'verify']);
    const registerServiceMock = jasmine.createSpyObj('RegisterService', ['register']);
    const resetPasswordServiceMock = jasmine.createSpyObj('ResetPasswordService', ['resetPassword']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const msalBroadcastServiceMock=jasmine.createSpyObj('MSAL_INSTANCE',[''])
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: MsalService, useValue: authServiceMock },
        { provide: SocialAuthService, useValue: authGServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: OtpService, useValue: otpServiceMock },
        { provide: RegisterService, useValue: registerServiceMock },
        { provide: ResetPasswordService, useValue: resetPasswordServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MSAL_GUARD_CONFIG, useValue: {} as MsalGuardConfiguration },
        { provide: MsalBroadcastService , useValue : msalBroadcastServiceMock}
       
      
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    authServiceSpy = TestBed.inject(MsalService) as jasmine.SpyObj<MsalService>;
    authGServiceSpy = TestBed.inject(SocialAuthService) as jasmine.SpyObj<SocialAuthService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    otpServiceSpy = TestBed.inject(OtpService) as jasmine.SpyObj<OtpService>;
    registerServiceSpy = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    resetPasswordServiceSpy = TestBed.inject(ResetPasswordService) as jasmine.SpyObj<ResetPasswordService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    msalBroadcastServiceSpy=TestBed.inject(MsalBroadcastService) as jasmine.SpyObj<MsalBroadcastService>
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service on login', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    // loginServiceSpy.login.and.returnValue(of({GUID:'', user_type:''}));

    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
  });

  it('should toggle password visibility', () => {
    component.view = false;

    component.viewPass();

    expect(component.view).toBe(true);
  });

  it('should switch to signup view', () => {
    component.isSignUp = false;

    component.openSignupMenu();

    expect(component.isSignUp).toBe(true);
  });

  it('should switch to login view', () => {
    component.isSignUp = true;

    component.alreadyAccount();

    expect(component.isSignUp).toBe(false);
  });

  it('should toggle password specification visibility', () => {
    component.isPasswordRulesVisible = false;

    component.showPasswordSpecification();

    expect(component.isPasswordRulesVisible).toBe(true);
  });

  it('should refresh Google auth token', () => {
    authGServiceSpy.refreshAuthToken.and.stub();

    component.refreshToken();

    expect(authGServiceSpy.refreshAuthToken).toHaveBeenCalledWith(GoogleLoginProvider.PROVIDER_ID);
  });

  it('should get Google access token', async () => {
    authGServiceSpy.getAccessToken.and.returnValue(Promise.resolve('testAccessToken'));

    await component.getAccessToken();

    // expect(component.accessToken).toBe('testAccessToken');
  });

 


  it('should open reset password view', () => {
    component.isResetPasswordOpen = false;

    component.openResetPassword();

    expect(component.isResetPasswordOpen).toBe(true);
  });

  it('should close reset password view', () => {
    component.isResetPasswordOpen = true;

    component.closeResetPassword();

    expect(component.isResetPasswordOpen).toBe(false);
  });



  it('should not reset password when passwords mismatch', () => {
    component.newPassword = 'newpassword';
    component.confirmNewPassword = 'mismatchedpassword';

    spyOn(window, 'alert'); // Spy on the alert function

    component.resetPassword();

    expect(window.alert).toHaveBeenCalledWith('password mismatch');
  });

  it('should toggle password visibility',()=>{

   component.viewPass();
   expect(component.view).toBeTrue();

   component.viewPass();
   expect(component.view).toBeFalse();

  });





})
