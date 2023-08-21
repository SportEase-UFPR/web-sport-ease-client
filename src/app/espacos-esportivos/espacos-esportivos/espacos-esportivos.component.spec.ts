import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacosEsportivosComponent } from './espacos-esportivos.component';

describe('EspacosEsportivosComponent', () => {
  let component: EspacosEsportivosComponent;
  let fixture: ComponentFixture<EspacosEsportivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspacosEsportivosComponent]
    });
    fixture = TestBed.createComponent(EspacosEsportivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
