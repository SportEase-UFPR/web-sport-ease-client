import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInputEmailComponent } from './without-input-email.component';

describe('WithoutInputEmailComponent', () => {
  let component: WithoutInputEmailComponent;
  let fixture: ComponentFixture<WithoutInputEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithoutInputEmailComponent]
    });
    fixture = TestBed.createComponent(WithoutInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
