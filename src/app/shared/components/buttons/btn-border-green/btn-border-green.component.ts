import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-btn-border-green',
  templateUrl: './btn-border-green.component.html',
  styleUrls: ['./btn-border-green.component.scss'],
})
export class BtnBorderGreenComponent implements OnInit {
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
