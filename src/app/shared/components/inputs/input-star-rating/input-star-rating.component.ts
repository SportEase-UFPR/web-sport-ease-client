import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-star-rating',
  templateUrl: './input-star-rating.component.html',
  styleUrls: ['./input-star-rating.component.scss'],
})
export class InputStarRatingComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() label: string = '';

  rating: number = 0.0

  faStar = faStar;

  constructor() {}

  ngOnInit(): void {
    this.formGroup.get('rating')?.valueChanges.subscribe((v) => this.rating = Number(v));
  }
}
