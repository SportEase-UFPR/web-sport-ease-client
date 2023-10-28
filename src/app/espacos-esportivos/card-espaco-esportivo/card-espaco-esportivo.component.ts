import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  faCalendarCheck,
  faCalendarXmark,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { EspacoEsportivoResponse } from 'src/app/shared/models/dto/espaco-esportivo-response/espaco-esportivo-response.model';

@Component({
  selector: 'app-card-espaco-esportivo',
  templateUrl: './card-espaco-esportivo.component.html',
  styleUrls: ['./card-espaco-esportivo.component.scss'],
})
export class CardEspacoEsportivoComponent implements OnInit {
  @Input() espaco!: EspacoEsportivoResponse;
  @Input() ratingMedio: string[] = ['a', 'a', 'm', 'c', 'c']

  faCalendar = faCalendarCheck;
  faCalendarX = faCalendarXmark;
  faStar = faStar;


  constructor(private sanatizer: DomSanitizer, private router: Router) {}

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
}
