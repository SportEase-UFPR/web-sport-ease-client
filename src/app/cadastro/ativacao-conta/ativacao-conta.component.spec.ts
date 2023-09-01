import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivacaoContaComponent } from './ativacao-conta.component';

describe('AtivacaoContaComponent', () => {
  let component: AtivacaoContaComponent;
  let fixture: ComponentFixture<AtivacaoContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivacaoContaComponent]
    });
    fixture = TestBed.createComponent(AtivacaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
