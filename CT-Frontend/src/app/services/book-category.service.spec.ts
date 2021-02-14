import { TestBed } from '@angular/core/testing';

import { BookCategoryService } from './book-category.service';

describe('BookCategoryService', () => {
  let service: BookCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
