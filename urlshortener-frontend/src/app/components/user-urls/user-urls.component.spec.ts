import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserURLsComponent } from './user-urls.component';
import { HistoryService } from '../../services/history.service';
import { ModifyUrlService } from '../../services/modify-url.service';
import { GenerateShortUrlService } from '../../services/generate-short-url.service';
import { ToastrService } from 'ngx-toastr';
import { NevbarComponent } from '../nevbar/nevbar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';

describe('UserURLsComponent', () => {
  let component: UserURLsComponent;
  let fixture: ComponentFixture<UserURLsComponent>;
  let historyServiceSpy: jasmine.SpyObj<HistoryService>;
  let modifyUrlServiceSpy: jasmine.SpyObj<ModifyUrlService>;
  let generateShortUrlServiceSpy: jasmine.SpyObj<GenerateShortUrlService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    const historyServiceMock = jasmine.createSpyObj('HistoryService', ['getHistory']);
    const modifyUrlServiceMock = jasmine.createSpyObj('ModifyUrlService', ['modify', 'delete']);
    const generateShortUrlServiceMock = jasmine.createSpyObj('GenerateShortUrlService', ['isExist']);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,NgxPaginationModule ],
      declarations: [UserURLsComponent,NevbarComponent], 
      providers: [
        { provide: HistoryService, useValue: historyServiceMock },
        { provide: ModifyUrlService, useValue: modifyUrlServiceMock },
        { provide: GenerateShortUrlService, useValue: generateShortUrlServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UserURLsComponent);
    component = fixture.componentInstance;
    historyServiceSpy = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
    modifyUrlServiceSpy = TestBed.inject(ModifyUrlService) as jasmine.SpyObj<ModifyUrlService>;
    generateShortUrlServiceSpy = TestBed.inject(GenerateShortUrlService) as jasmine.SpyObj<GenerateShortUrlService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

 
  it('should modify URL if it does not already exist', () => {
    generateShortUrlServiceSpy.isExist.and.returnValue(false);

    component.modifyUrl('newURL');

    expect(generateShortUrlServiceSpy.isExist).toHaveBeenCalledWith('newURL');
    expect(modifyUrlServiceSpy.modify).toHaveBeenCalledWith('newURL');
  });

  it('should show alert if URL already exists during modification', () => {
    generateShortUrlServiceSpy.isExist.and.returnValue(true);

    spyOn(window, 'alert'); // Spy on the alert function

    component.modifyUrl('existingURL');

    expect(window.alert).toHaveBeenCalledWith('sorry this url already exist in system');
    expect(modifyUrlServiceSpy.modify).not.toHaveBeenCalled();
  });

  it('should set edit to true when editing URL', () => {
    component.edit = false;

    component.editUrl('urlData');

    expect(component.edit).toBe(true);
  });

  it('should set edit to false when closing editor', () => {
    component.edit = true;

    component.closeEditor();

    expect(component.edit).toBe(false);
  });

  it('should delete URL and refresh history', () => {
    const urlData = { originalURL: 'testURL' };

    component.deleteUrl(urlData);

    expect(modifyUrlServiceSpy.delete).toHaveBeenCalledWith('testURL');
    expect(historyServiceSpy.getHistory).toHaveBeenCalled();
  });
 

//... Previous test cases

it("should handle URL deletion",()=>{
  const mockUrlData={
    originalURL:"http://abcd.com"
  }


  component.deleteUrl(mockUrlData);
  expect(modifyUrlServiceSpy.delete).toHaveBeenCalledWith(mockUrlData.originalURL);
  expect(historyServiceSpy.getHistory).toHaveBeenCalled();
})
});