import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrucoesAtivacaoContaComponent } from './intrucoes-ativacao-conta.component';

describe('IntrucoesAtivacaoContaComponent', () => {
  let component: IntrucoesAtivacaoContaComponent;
  let fixture: ComponentFixture<IntrucoesAtivacaoContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntrucoesAtivacaoContaComponent]
    });
    fixture = TestBed.createComponent(IntrucoesAtivacaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
