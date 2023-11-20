import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = 'dd/mm/aaaa';
  @Input() label: string = '';
  @Input() enabledDays: number[] = [0, 1, 2, 3, 4, 5, 6];
  @Input() validacaoInput: boolean = false;
  @Input() haveMinDate: boolean = false;
  @Input() minDate!: Date | null;
  @Input() haveMaxDate: boolean = false;
  @Input() maxDate!: Date | null;

  faCalendar = faCalendar;


  constructor(private dateAdapter: DateAdapter<Date>) {
    const today = new Date();
    this.minDate = today;
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {}

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const day = date.getDay();

    return this.enabledDays?.includes(day);
  };

  inputValid(): boolean {
    return ValidacoesForm.inputInvalid(
      this.formGroup,
      this.controlName,
      this.validacaoInput
    );
  }
}
