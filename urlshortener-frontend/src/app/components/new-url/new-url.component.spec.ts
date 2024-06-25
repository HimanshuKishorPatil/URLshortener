import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewURLComponent } from './new-url.component';
import { HistoryService } from '../../services/history.service';
import { GenerateShortUrlService } from '../../services/generate-short-url.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Renderer2 } from '@angular/core';
import { NevbarComponent } from '../nevbar/nevbar.component';
import { of } from 'rxjs';

describe('NewURLComponent', () => {
  let component: NewURLComponent;
  let fixture: ComponentFixture<NewURLComponent>;
  let historyServiceSpy: jasmine.SpyObj<HistoryService>;
  let generateShortUrlServiceSpy: jasmine.SpyObj<GenerateShortUrlService>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let renderer2Spy: jasmine.SpyObj<Renderer2>;
 

  beforeEach(() => {
    const historyServiceMock = jasmine.createSpyObj('HistoryService', ['']);
    const generateShortUrlServiceMock = jasmine.createSpyObj('GenerateShortUrlService', ['verifyURL', 'isExist', 'generateShortURL', 'showURL']);
    const loginServiceMock = jasmine.createSpyObj('LoginService', ['']);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success']);
    const renderer2Mock = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'setProperty']);

    TestBed.configureTestingModule({
      declarations: [NewURLComponent,NevbarComponent],
      imports:[],
      providers: [
        { provide: HistoryService, useValue: historyServiceMock },
        { provide: GenerateShortUrlService, useValue: generateShortUrlServiceMock },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Renderer2, useValue: renderer2Mock },
      ],
    });

    fixture = TestBed.createComponent(NewURLComponent);
    component = fixture.componentInstance;
  
    historyServiceSpy = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
    generateShortUrlServiceSpy = TestBed.inject(GenerateShortUrlService) as jasmine.SpyObj<GenerateShortUrlService>;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    renderer2Spy = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should paste from clipboard', async () => {
    spyOn(navigator.clipboard, 'readText').and.returnValue(Promise.resolve('pastedValue'));
    await component.paste();
    expect(component.longurl).toBe('pastedValue');
  });

  it('should generate short URL if URL is valid and not already exist', async () => {
    component.longurl = 'validURL';
    loginServiceSpy.loggedInUser = { GUID: 'testGUID',user_type:"email" };
    generateShortUrlServiceSpy.verifyURL.and.returnValue(true);
    generateShortUrlServiceSpy.isExist.and.returnValue(false);
    generateShortUrlServiceSpy.generateShortURL.and.returnValue(Promise.resolve());
    generateShortUrlServiceSpy.showURL.and.stub();
    await component.generteShortUrl();
    expect(generateShortUrlServiceSpy.verifyURL).toHaveBeenCalledWith('validURL');
    // expect(generateShortUrlServiceSpy.isExist).toHaveBeenCalledWith('validURL');
    expect(generateShortUrlServiceSpy.generateShortURL).toHaveBeenCalledWith({
      UUID: 'testGUID',
      originalURL: 'validURL'
    });
    expect(generateShortUrlServiceSpy.showURL).toHaveBeenCalled();
  });

  it('should not generate short URL if URL is invalid', async () => {
    component.longurl = 'invalidURL';
    generateShortUrlServiceSpy.verifyURL.and.returnValue(false);

    spyOn(window, 'alert'); // Spy on the alert function

    await component.generteShortUrl();

    expect(window.alert).toHaveBeenCalledWith('invalid URL');
    expect(generateShortUrlServiceSpy.isExist).not.toHaveBeenCalled();
    expect(generateShortUrlServiceSpy.generateShortURL).not.toHaveBeenCalled();
    expect(generateShortUrlServiceSpy.showURL).not.toHaveBeenCalled();
  });


  it('should handle url copy',()=>{
    const mockURL= 'https://abcd.com';
    spyOn(document,'createElement').and.callThrough();
    spyOn(document.body,'appendChild').and.callThrough();
    spyOn(document.body,'removeChild').and.callThrough();
    spyOn(document,'execCommand').and.callThrough();

    component.copyMessage(mockURL);

    expect(document.createElement).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
    expect(document.execCommand).toHaveBeenCalled();

  })

  })