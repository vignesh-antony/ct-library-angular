import { TestBed } from '@angular/core/testing';

import { ManageBooksService } from './manage-books.service';

describe('ManageBooksService', () => {
  let service: ManageBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
