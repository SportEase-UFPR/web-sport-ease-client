import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivacaoEmailComponent } from './ativacao-email.component';

describe('AtivacaoEmailComponent', () => {
  let component: AtivacaoEmailComponent;
  let fixture: ComponentFixture<AtivacaoEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivacaoEmailComponent]
    });
    fixture = TestBed.createComponent(AtivacaoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
