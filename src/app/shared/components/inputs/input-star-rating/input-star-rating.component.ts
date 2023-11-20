import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input-star-rating',
  templateUrl: './input-star-rating.component.html',
  styleUrls: ['./input-star-rating.component.scss'],
})
export class InputStarRatingComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() label: string = '';

  rating: number = 0.0;

  faStar = faStar;

  rating$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.formGroup
      .get('rating')
      ?.valueChanges.pipe(takeUntil(this.rating$))
      .subscribe((v) => (this.rating = Number(v)));
  }

  ngOnDestroy(): void {
    this.rating$.next(null);
    this.rating$.complete();
  }
}
