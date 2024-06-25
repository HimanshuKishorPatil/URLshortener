import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
    let service: RegisterService;
    let httpTestingController: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [RegisterService],
      });
  
      service = TestBed.inject(RegisterService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should register user successfully', () => {
      const userData = { username: 'testuser', password: 'password' };
  
      service.register(userData).subscribe((resultData) => {
        expect(resultData).toBeTrue();
      });
  
      const req = httpTestingController.expectOne('http://localhost:3000/register');
      expect(req.request.method).toBe('POST');
      req.flush(true);
      httpTestingController
      // Continuing from the previous test cases...
  
      .verify();
    });
  
    it('should handle registration failure', () => {
      const userData = { username: 'existinguser', password: 'password' };
  
      service.register(userData).subscribe((resultData) => {
        expect(resultData).toBeFalse();
      });
  
      const req = httpTestingController.expectOne('http://localhost:3000/register');
      expect(req.request.method).toBe('POST');
      req.flush(false);
      httpTestingController.verify();
    });
  
    it('should handle errors during registration', () => {
      const userData = { username: 'testuser', password: 'password' };
  
      service.register(userData).subscribe(
        (resultData) => fail('should have failed with an error'),
        (error) => {
          expect(error).toBeTruthy();
        }
      );
  
      const req = httpTestingController.expectOne('http://localhost:3000/register');
      expect(req.request.method).toBe('POST');
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
      httpTestingController.verify();
    });
  
    afterEach(() => {
      httpTestingController.verify();
    });
  });