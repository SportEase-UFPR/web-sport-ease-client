import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEspacoEsportivoComponent } from './card-espaco-esportivo.component';

describe('CardEspacoEsportivoComponent', () => {
  let component: CardEspacoEsportivoComponent;
  let fixture: ComponentFixture<CardEspacoEsportivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardEspacoEsportivoComponent]
    });
    fixture = TestBed.createComponent(CardEspacoEsportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
