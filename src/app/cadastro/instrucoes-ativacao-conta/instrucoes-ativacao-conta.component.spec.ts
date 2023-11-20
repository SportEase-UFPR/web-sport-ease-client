import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrucoesAtivacaoContaComponent } from './instrucoes-ativacao-conta.component';

describe('InstrucoesAtivacaoContaComponent', () => {
  let component: InstrucoesAtivacaoContaComponent;
  let fixture: ComponentFixture<InstrucoesAtivacaoContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrucoesAtivacaoContaComponent]
    });
    fixture = TestBed.createComponent(InstrucoesAtivacaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
