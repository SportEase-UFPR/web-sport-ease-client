import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-btn-green',
  templateUrl: './btn-green.component.html',
  styleUrls: ['./btn-green.component.scss']
})
export class BtnGreenComponent implements OnInit {
  @Input() buttonDisabled: boolean = false;
  @Input() textButton: string = '';
  @Input() showIcon: boolean = false;
  @Input() iconFirst: boolean = true;
  @Input() icone: any;

  @Output() emmiterClick = new EventEmitter();

  @ViewChild('buttonGreen') buttonGreen!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.buttonGreen) {
      this.buttonGreen.nativeElement.disabled = this.buttonDisabled;
    }
  }

  clickButton(data: any): void {
    return this.emmiterClick.emit(data);
  }
}
