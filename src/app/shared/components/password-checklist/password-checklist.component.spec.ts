import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChecklistComponent } from './password-checklist.component';

describe('PasswordChecklistComponent', () => {
  let component: PasswordChecklistComponent;
  let fixture: ComponentFixture<PasswordChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordChecklistComponent]
    });
    fixture = TestBed.createComponent(PasswordChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
