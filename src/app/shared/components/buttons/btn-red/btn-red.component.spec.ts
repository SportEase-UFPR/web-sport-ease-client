import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRedComponent } from './btn-red.component';

describe('BtnRedComponent', () => {
  let component: BtnRedComponent;
  let fixture: ComponentFixture<BtnRedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnRedComponent]
    });
    fixture = TestBed.createComponent(BtnRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
