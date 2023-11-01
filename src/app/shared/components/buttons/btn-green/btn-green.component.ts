import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-green',
  templateUrl: './btn-green.component.html',
  styleUrls: ['./btn-green.component.scss']
})
export class BtnGreenComponent implements OnInit {
  @Input() buttonDisabled: boolean = false;
  @Input() textButton: string = '';
  @Input() type: string = '';
  @Input() showIcon: boolean = false;
  @Input() iconFirst: boolean = true;
  @Input() icone: any;

  @Output() emmiterClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickButton(data: any): void {
    return this.emmiterClick.emit(data);
  }
}
