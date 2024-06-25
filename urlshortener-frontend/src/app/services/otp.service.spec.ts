import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { OtpService } from './otp.service';
import { RegisterService } from './register.service';

describe('OtpService', () => {
    let service: OtpService;
    let httpTestingController: HttpTestingController;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  
    beforeEach(() => {
      const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [OtpService, { provide: ToastrService, useValue: toastrSpy }],
      });
  
      service = TestBed.inject(OtpService);
      httpTestingController = TestBed.inject(HttpTestingController);
      toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should send OTP successfully and show success toastr', () => {
      const username = 'testuser';
  
      service.sendOtp(username);
  
      const req = httpTestingController.expectOne('http://localhost:3000/sendOtp');
      expect(req.request.method).toBe('POST');
      req.flush(true);
      httpTestingController.verify();
  
      expect(service.otpSent).toBeTrue();
      expect(toastrServiceSpy.success).toHaveBeenCalledWith('sent', 'check the device');
    });
  
    it('should handle failed OTP sending and show error toastr', () => {
      const username = 'invaliduser';
  
      service.sendOtp(username);
  
      const req = httpTestingController.expectOne('http://localhost:3000/sendOtp');
      expect(req.request.method).toBe('POST');
      req.flush(false);
      httpTestingController.verify();
  
      expect(service.otpSent).toBeFalse();
      expect(toastrServiceSpy.error).toHaveBeenCalledWith('failed to send otp', 'Try again');
    });
  
    it('should verify OTP successfully', () => {
      const otp = '123456';
  
      service.verify(otp);
  
      const req = httpTestingController.expectOne('http://localhost:3000/verifyOtp');
      expect(req.request.method).toBe('POST');
      req.flush(true);
      httpTestingController.verify();
  
      expect(service.otpVerified).toBeTrue();
    });
  
    it('should verify OTP unsuccessfully', () => {
      const otp = '456';
  
      service.verify(otp);
  
      const req = httpTestingController.expectOne('http://localhost:3000/verifyOtp');
      expect(req.request.method).toBe('POST');
      req.flush(false);
      httpTestingController.verify();
  
      expect(service.otpVerified).toBeFalse();
    });
  
    it('should verify new username existence successfully', () => {
      const username = 'newuser';
  
      service.verifyNewUsernameAlreadyExist(username);
  
      const req = httpTestingController.expectOne('http://localhost:3000/verifyUser');
      expect(req.request.method).toBe('POST');
      req.flush({ result: true });
      httpTestingController.verify();
  
      expect(service.isUsernameAlreadyExist).toBeTrue();
      expect(toastrServiceSpy.error).toHaveBeenCalledWith('failed to send otp', 'Username Already Exist');
    });
  
    it('should verify new username existence unsuccessfully', () => {
      const username = 'existinguser';
  
      service.verifyNewUsernameAlreadyExist(username);
  
      const req = httpTestingController.expectOne('http://localhost:3000/verifyUser');
      expect(req.request.method).toBe('POST');
      req.flush({ result: false });
      httpTestingController.verify();
  
      expect(service.isUsernameAlreadyExist).toBeFalse();
      // expect(toastrServiceSpy.error).not.toHaveBeenCalled();
    });
  });
  