import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeetraining } from './employeetraining';

describe('Employeetraining', () => {
  let component: Employeetraining;
  let fixture: ComponentFixture<Employeetraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeetraining]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeetraining);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
