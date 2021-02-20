import { TestBed } from '@angular/core/testing';

import { AlertBoxService } from './alert-box.service';

describe('AlertBoxService', () => {
  let service: AlertBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
