import { TestBed } from '@angular/core/testing';

import { TransactionsResolver } from './transactions.resolver';

describe('TransactionsResolver', () => {
  let resolver: TransactionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TransactionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
