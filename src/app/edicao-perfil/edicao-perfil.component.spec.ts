import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoPerfilComponent } from './edicao-perfil.component';

describe('EdicaoPerfilComponent', () => {
  let component: EdicaoPerfilComponent;
  let fixture: ComponentFixture<EdicaoPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicaoPerfilComponent]
    });
    fixture = TestBed.createComponent(EdicaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
