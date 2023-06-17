import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInputTextComponent } from './without-input-text.component';

describe('WithoutInputTextComponent', () => {
  let component: WithoutInputTextComponent;
  let fixture: ComponentFixture<WithoutInputTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithoutInputTextComponent]
    });
    fixture = TestBed.createComponent(WithoutInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
