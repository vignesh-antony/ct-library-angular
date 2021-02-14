import { TestBed } from '@angular/core/testing';

import { IssueBooksService } from './issue-books.service';

describe('IssueBooksService', () => {
  let service: IssueBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
