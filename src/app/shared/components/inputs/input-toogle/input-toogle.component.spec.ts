import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputToogleComponent } from './input-toogle.component';

describe('InputToogleComponent', () => {
  let component: InputToogleComponent;
  let fixture: ComponentFixture<InputToogleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputToogleComponent]
    });
    fixture = TestBed.createComponent(InputToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
