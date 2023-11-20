import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectOptionComponent } from './input-select-option.component';

describe('InputSelectOptionComponent', () => {
  let component: InputSelectOptionComponent;
  let fixture: ComponentFixture<InputSelectOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSelectOptionComponent]
    });
    fixture = TestBed.createComponent(InputSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
