import { TestBed } from '@angular/core/testing';

import { DarkLightModeService } from './dark-light-mode.service';

describe('DarkLightModeService', () => {
  let service: DarkLightModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkLightModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
