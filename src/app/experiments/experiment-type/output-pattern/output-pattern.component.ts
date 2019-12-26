import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { isObservable, Observable, Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ValueAccessorBase } from '../../../share/value-accessor-base';

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
  @ViewChild('canvas', {static: true}) canvas: ElementRef;

  checkboxes: number[] = [];

  private _disableChangePropagation = false;
  _patternSize: number;

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
    if (this.canvas === undefined) {
      return;
    }
    const canvas = (this.canvas.nativeElement as HTMLCanvasElement);
    canvas.width = canvas.parentElement.clientWidth;
    const graphics = canvas.getContext('2d');
    const width = canvas.width;

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
        this._initCheckboxes();
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

  handleEmptyPattern() {
    this.value = 0;
    this._initCheckboxes();
    this._drawPattern();
  }

  handleFullPattern() {
    this.value = 0xFFFFFFFF;
    this._initCheckboxes();
    this._drawPattern();
  }

  handleInvertPattern() {
    this.value = ~this.value;
    this._initCheckboxes();
    this._drawPattern();
  }
}
