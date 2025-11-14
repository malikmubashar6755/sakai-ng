import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leavetype } from './leavetype';

describe('Leavetype', () => {
  let component: Leavetype;
  let fixture: ComponentFixture<Leavetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leavetype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leavetype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
