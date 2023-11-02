import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-toogle',
  templateUrl: './input-toogle.component.html',
  styleUrls: ['./input-toogle.component.scss'],
})
export class InputToogleComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() label: string = '';

  @Output() emitterClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.emitterClick.emit();
  }
}
