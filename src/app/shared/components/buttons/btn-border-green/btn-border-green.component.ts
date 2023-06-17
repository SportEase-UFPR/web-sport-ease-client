import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-border-green',
  templateUrl: './btn-border-green.component.html',
  styleUrls: ['./btn-border-green.component.scss']
})
export class BtnBorderGreenComponent implements OnInit {
  @Input() buttonDisabled: boolean = false;
  @Input() textButton: string = '';
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
