import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NevbarComponent } from './nevbar.component';
import { LoginService } from '../../services/login.service';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';
import { GenerateShortUrlService } from '../../services/generate-short-url.service';
import { UserURLsComponent } from '../user-urls/user-urls.component';
import { ToastrService } from 'ngx-toastr';


describe('NevbarComponent', () => {
  let component: NevbarComponent;
  let fixture: ComponentFixture<NevbarComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let historyServiceSpy: jasmine.SpyObj<HistoryService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let generateShortUrlServiceSpy: jasmine.SpyObj<GenerateShortUrlService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  beforeEach(() => {
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['logout']);
    const historyServiceMock = jasmine.createSpyObj('HistoryService', ['showHistory']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const generateShortUrlServiceMock = jasmine.createSpyObj('GenerateShortUrlService', ['close']);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
     
      declarations: [NevbarComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: HistoryService, useValue: historyServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: GenerateShortUrlService, useValue: generateShortUrlServiceMock },
      ],
    });

    fixture = TestBed.createComponent(NevbarComponent);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    historyServiceSpy = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    generateShortUrlServiceSpy = TestBed.inject(GenerateShortUrlService) as jasmine.SpyObj<GenerateShortUrlService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log out user and navigate to home page', () => {
    component.logout();

    expect(loginServiceSpy.isLoggedIn).toBeFalse();
    expect(loginServiceSpy.loggedInUser).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']); 
  });

  it('should show history and close generate short URL service', () => {
    component.showHistory();
fixture.detectChanges();
    expect(generateShortUrlServiceSpy.close).toHaveBeenCalled();
    expect(historyServiceSpy.showHistory).toHaveBeenCalled();
  });
  it('should handle navigation to different pages', () => {
    // spyOn(router, 'navigate');
  
    component.showHistory();
    expect(generateShortUrlServiceSpy.close).toHaveBeenCalled();
    expect(historyServiceSpy.showHistory).toHaveBeenCalled();
  
    component.logout();
    expect(loginServiceSpy.isLoggedIn).toBeFalse();
    expect(loginServiceSpy.loggedInUser).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
  
  it('should handle navigation to different pages', () => {
    // spyOn(router, 'navigate');
  
    component.showHistory();
    expect(generateShortUrlServiceSpy.close).toHaveBeenCalled();
    expect(historyServiceSpy.showHistory).toHaveBeenCalled();
  
    component.logout();
    expect(loginServiceSpy.isLoggedIn).toBeFalse();
    expect(loginServiceSpy.loggedInUser).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});