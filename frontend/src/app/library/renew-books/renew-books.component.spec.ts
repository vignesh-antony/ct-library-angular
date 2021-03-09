import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewBooksComponent } from './renew-books.component';

describe('RenewBooksComponent', () => {
  let component: RenewBooksComponent;
  let fixture: ComponentFixture<RenewBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
