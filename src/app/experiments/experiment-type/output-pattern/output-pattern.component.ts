import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ValueAccessorBase } from '../../../share/value-accessor-base';

import { environment } from '../../../../environments/environment';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObservable, Observable } from 'rxjs';

@Component({
  selector: 'app-output-pattern',
  templateUrl: './output-pattern.component.html',
  styleUrls: ['./output-pattern.component.sass'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: OutputPatternComponent, multi: true}
  ]
})
export class OutputPatternComponent extends ValueAccessorBase<number> implements OnInit {

  @Input() patternSize: number|Observable<number> = environment.patternSize;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;

  checkboxes: number[] = [];

  private _disableChangePropagation = true;
  private _patternSize: number;

  constructor() {
    super(0);
  }

  private _initCheckboxes() {
    this.checkboxes.splice(0);
    for (let i = this._patternSize - 1; i >= 0; i--) {
      const value = (this.value >> i) & 1;
      this.checkboxes.push(value);
    }
  }

  private _drawPattern() {
    const canvas = (this.canvas.nativeElement as HTMLCanvasElement);
    canvas.width = canvas.parentElement.clientWidth;
    // canvas.height = canvas.parentElement.clientHeight;
    const graphics = canvas.getContext('2d');
    const width = canvas.width;
    // const height = canvas.height;

    const patternWidth = width / (this._patternSize + 1);
    const patternHeight = 30;
    let x = 0;
    let y = patternHeight;
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    graphics.strokeStyle = 'black';
    graphics.beginPath();
    graphics.moveTo(x, y);
    for (let i = 0; i < this._patternSize; i++) {
      const value = (this.value >> (this._patternSize - 1 - i)) & 1;
      if (value === 1) {
        x += (patternWidth / 2);
        graphics.lineTo(x, y);
        y -= patternHeight;
        graphics.lineTo(x, y);
        x += (patternWidth / 2);
        graphics.lineTo(x, y);
        y += patternHeight;
        graphics.lineTo(x, y);
      } else {
        x += patternWidth;
        graphics.lineTo(x, y);
      }
    }
    x += patternWidth / 2;
    graphics.lineTo(x, y);
    graphics.stroke();
  }

  ngOnInit(): void {
    if (isObservable(this.patternSize)) {
      this.patternSize.subscribe(patternSize => {
        this._patternSize = patternSize;
        this._drawPattern();
      });
    } else if (typeof this.patternSize === 'number') {
      this._patternSize = this.patternSize;
    }
    setTimeout(() => {
      this._initCheckboxes();
      this._disableChangePropagation = false;
      this._drawPattern();
    }, 500);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._drawPattern();
  }

  handleCheckboxChange(event: any, index: number) {
    if (this._disableChangePropagation) {
      return;
    }

    const checked = (event.target as HTMLInputElement).checked;
    const x = checked ? 1 : 0;
    this.value ^= (-x ^ this.value) & (1 << index);
    this._drawPattern();
  }
}
