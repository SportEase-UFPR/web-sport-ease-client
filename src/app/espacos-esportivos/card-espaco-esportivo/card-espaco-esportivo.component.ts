import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  faCalendarCheck,
  faCalendarXmark,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { EspacoEsportivoResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { EspacosEsportivosService } from '../services/espacos-esportivos.service';

@Component({
  selector: 'app-card-espaco-esportivo',
  templateUrl: './card-espaco-esportivo.component.html',
  styleUrls: ['./card-espaco-esportivo.component.scss'],
})
export class CardEspacoEsportivoComponent implements OnInit {
  @Input() espaco!: EspacoEsportivoResponse;
  @Input() ratingMedio: string[] = ['a', 'a', 'm', 'c', 'c'];

  faCalendar = faCalendarCheck;
  faCalendarX = faCalendarXmark;
  faStar = faStar;

  constructor(
    private sanatizer: DomSanitizer,
    private router: Router,
    private eeService: EspacosEsportivosService
  ) {}

  ngOnInit(): void {}

  sanatizerImg(imgUrl: string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(
      `data:image/jpeg;base64,${imgUrl}`
    );
  }

  solicitarReserva(id: number): void {
    this.router.navigate(['/nova-reserva'], {
      queryParams: {
        espaco: id,
      },
    });
  }

  buildingStartsRating(media: number): string[] {
    let stars = ['a', 'a', 'a', 'a', 'a'];
    if (media <= 4.7) {
      const parteInteira = Math.trunc(media);
      const parteDecimal = media % 1;
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
}
