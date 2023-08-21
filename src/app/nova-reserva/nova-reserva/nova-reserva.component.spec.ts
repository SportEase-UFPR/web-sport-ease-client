import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaReservaComponent } from './nova-reserva.component';

describe('NovaReservaComponent', () => {
  let component: NovaReservaComponent;
  let fixture: ComponentFixture<NovaReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovaReservaComponent]
    });
    fixture = TestBed.createComponent(NovaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
