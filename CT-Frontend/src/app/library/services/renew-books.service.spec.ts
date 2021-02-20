import { TestBed } from '@angular/core/testing';

import { RenewBooksService } from './renew-books.service';

describe('RenewBooksService', () => {
  let service: RenewBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenewBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
