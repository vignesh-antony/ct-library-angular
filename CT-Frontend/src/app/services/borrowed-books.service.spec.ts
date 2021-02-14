import { TestBed } from '@angular/core/testing';

import { BorrowedBooksService } from './borrowed-books.service';

describe('BorrowedBooksService', () => {
  let service: BorrowedBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowedBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
