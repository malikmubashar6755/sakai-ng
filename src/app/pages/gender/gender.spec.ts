import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gender } from './gender';

describe('Gender', () => {
  let component: Gender;
  let fixture: ComponentFixture<Gender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
