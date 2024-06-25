import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, { provide: ToastrService, useValue: toastrSpy },  { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and navigate to home', async () => {
    const bodyData = { username: 'test', password: 'password' };

    (await service.login(bodyData)).subscribe((resultData) => {
      expect(resultData).toBeTruthy();
      expect(service.isLoggedIn).toBeTrue();
      expect(service.loggedInUser).toBeTruthy();
      expect(toastrServiceSpy.success).toHaveBeenCalledWith('Login successful', 'Welcome');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    req.flush({ status: 200, body: { UUID: '123', user_type: 'user' } });
    httpTestingController.verify();
  });

  it('should handle invalid login with toastr error', async () => {
    const bodyData = { username: 'invalid', password: 'password' };

    (await service.login(bodyData)).subscribe((resultData) => {
      expect(resultData).toBeNull();
      expect(service.isLoggedIn).toBeFalse();
      expect(service.loggedInUser).toBeNull();
      expect(toastrServiceSpy.error).toHaveBeenCalledWith('invalid login', 'try again');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    req.flush(null);
    httpTestingController.verify();
  });
  
  

  
});


