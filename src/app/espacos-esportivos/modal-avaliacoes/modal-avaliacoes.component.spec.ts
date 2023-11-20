import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAvaliacoesComponent } from './modal-avaliacoes.component';

describe('ModalAvaliacoesComponent', () => {
  let component: ModalAvaliacoesComponent;
  let fixture: ComponentFixture<ModalAvaliacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAvaliacoesComponent]
    });
    fixture = TestBed.createComponent(ModalAvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
