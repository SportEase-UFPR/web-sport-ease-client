import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInputSenhaComponent } from './without-input-senha.component';

describe('WithoutInputSenhaComponent', () => {
  let component: WithoutInputSenhaComponent;
  let fixture: ComponentFixture<WithoutInputSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithoutInputSenhaComponent]
    });
    fixture = TestBed.createComponent(WithoutInputSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
