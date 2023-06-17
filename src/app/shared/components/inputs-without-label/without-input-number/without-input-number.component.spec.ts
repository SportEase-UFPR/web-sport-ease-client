import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInputNumberComponent } from './without-input-number.component';

describe('WithoutInputNumberComponent', () => {
  let component: WithoutInputNumberComponent;
  let fixture: ComponentFixture<WithoutInputNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithoutInputNumberComponent]
    });
    fixture = TestBed.createComponent(WithoutInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
