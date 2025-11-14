import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeeshift } from './employeeshift';

describe('Employeeshift', () => {
  let component: Employeeshift;
  let fixture: ComponentFixture<Employeeshift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeeshift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeeshift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
