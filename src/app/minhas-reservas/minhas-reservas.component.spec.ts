import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasReservasComponent } from './minhas-reservas.component';

describe('MinhasReservasComponent', () => {
  let component: MinhasReservasComponent;
  let fixture: ComponentFixture<MinhasReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinhasReservasComponent]
    });
    fixture = TestBed.createComponent(MinhasReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
