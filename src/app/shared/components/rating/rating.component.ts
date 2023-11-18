import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() nota: number = 5;
  @Input() isClickable: boolean = false;
  @Input('qtd') qtdAvaliacoes: number = 0;

  @Output() emitterClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  buildingStartsRating(): string[] {
    let stars = ['a', 'a', 'a', 'a', 'a'];
    if (this.nota <= 4.7) {
      const parteInteira = Math.trunc(this.nota);
      const parteDecimal = this.nota % 1;
      for (let i = parteInteira; i < 5; i++) {
        if (i == parteInteira) {
          stars[i] =
            parteDecimal <= 0.3 ? 'c' : parteDecimal >= 0.7 ? 'a' : 'm';
        } else {
          stars[i] = 'c';
        }
      }
    }

    return stars;
  }

  onClick() {
    this.emitterClick.emit();
  }
}
