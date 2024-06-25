import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { GenerateShortUrlService } from "./generate-short-url.service"
import { TestBed } from "@angular/core/testing";
import { ToastrService } from "ngx-toastr";



describe('GenerateShortUrlService', () => {

    let service: GenerateShortUrlService;

    let httpTestingController: HttpTestingController;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;


    beforeEach(() => {
        const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);


        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GenerateShortUrlService,
                { provide: ToastrService, useValue: toastrSpy }]
        })

        service = TestBed.inject(GenerateShortUrlService);
        httpTestingController = TestBed.inject(HttpTestingController);
        toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })
    it('should open generated URL popup ', () => {
       service.showURL()
       expect(service.generatedurl).toBe(true)
    })

    it('should close popup', () => {
        service.close()
        expect(service.generatedurl).toBe(false)
    })

    it('should generate Short URL and return it', () => {
        expect(service).toBeTruthy();
    })
    it('should not accept invalid URL and also notify ', () => {
        const testUrl="testUrl"
        spyOn(window, 'alert');
       const isvalid=service.verifyURL(testUrl);
      
       expect(service.shortUrl).toBe("You have Entered Invalid Url")
       expect(isvalid).toBeFalse()
       expect(window.alert).toHaveBeenCalledWith("You have Entered Invalid Url");
    })

  
    it('should return true for valid url', () => {
        expect(service).toBeTruthy();


    })
    it('should return true for valid url', () => {
        expect(service).toBeTruthy();


    })
    it('should return true for valid url', () => {
        expect(service).toBeTruthy();


    })













})