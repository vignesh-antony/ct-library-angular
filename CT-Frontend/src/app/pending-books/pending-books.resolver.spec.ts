import { TestBed } from '@angular/core/testing';

import { PendingBooksResolver } from './pending-books.resolver';

describe('PendingBooksResolver', () => {
  let resolver: PendingBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PendingBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
