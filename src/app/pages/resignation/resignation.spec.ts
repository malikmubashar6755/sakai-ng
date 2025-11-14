import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resignation } from './resignation';

describe('Resignation', () => {
  let component: Resignation;
  let fixture: ComponentFixture<Resignation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resignation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resignation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
