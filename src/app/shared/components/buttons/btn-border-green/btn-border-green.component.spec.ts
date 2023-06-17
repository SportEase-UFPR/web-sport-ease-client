import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBorderGreenComponent } from './btn-border-green.component';

describe('BtnBorderGreenComponent', () => {
  let component: BtnBorderGreenComponent;
  let fixture: ComponentFixture<BtnBorderGreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnBorderGreenComponent]
    });
    fixture = TestBed.createComponent(BtnBorderGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
