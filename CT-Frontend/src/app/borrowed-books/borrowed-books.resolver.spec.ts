import { TestBed } from '@angular/core/testing';

import { BorrowedBooksResolver } from './borrowed-books.resolver';

describe('BorrowedBooksResolver', () => {
  let resolver: BorrowedBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BorrowedBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
