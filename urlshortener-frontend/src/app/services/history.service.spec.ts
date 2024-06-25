


import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ComponentFixture, TestBed, async, fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from "@angular/core/testing";
import { ToastrService } from "ngx-toastr";
import { HistoryService } from "./history.service";
import exp from "constants";



describe('HistoryService', () => {

    let service: HistoryService;

    let httpTestingController: HttpTestingController;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;


    beforeEach(() => {
        const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);


        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HistoryService,
                { provide: ToastrService, useValue: toastrSpy }]
        })

        service = TestBed.inject(HistoryService);
        httpTestingController = TestBed.inject(HttpTestingController);
        toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    });




    it('should be created', async() => {
    
        expect(service).toBeTruthy();
    });
    
    it("should toggle between history page and home page",waitForAsync(()=>{
    service.showHistory();
    expect(service.isViewHistory).toBeTrue()
    
    service.showHistory();
    expect(service.isViewHistory).toBeFalse();
    
    }))


// fakeAsync 
    it("should successfully run fake-asyc",fakeAsync(()=>{
    let test =true
        setTimeout(() => {
        test =false;
        expect(test).toBeFalse();
    }, 2000);
 tick(2000)
    // flush();
    }))
// use of done function 
    it("should successfully run done funtion",(done:DoneFn)=>{
        let test =true
            setTimeout(() => {
        test =false;
          expect(test).toBeFalse();
          done();
        },2000);

        
        })

//  promises are the microtask have to flush by flushmicrotask

it("should resolve promises",fakeAsync(()=>{

    let test=false;
    Promise.resolve().then(()=>{

        console.log("first then resolved")
        return Promise.resolve();
    }).then(()=>{
        console.log("second then resolved")
        test =true
    })
tick()
flushMicrotasks();
    expect(test).toBeTruthy()
}))





})