import { TestBed } from '@angular/core/testing';

import { StaffResolver } from './staff.resolver';

describe('StaffResolver', () => {
  let resolver: StaffResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StaffResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
