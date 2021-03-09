import { TestBed } from '@angular/core/testing';

import { BookCategoryResolver } from './book-category.resolver';

describe('BookCategoryResolver', () => {
  let resolver: BookCategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BookCategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
