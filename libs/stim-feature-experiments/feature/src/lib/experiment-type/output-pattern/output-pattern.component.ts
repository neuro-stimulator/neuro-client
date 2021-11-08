import { Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { isObservable, Observable } from 'rxjs';
import { ValueAccessorBase } from '@neuro-client/stim-lib-ui';
import { TOKEN_PATTERN_SIZE } from '@neuro-client/stim-lib-common';

@Component({
  selector: 'stim-feature-experiments-output-pattern',
  templateUrl: './output-pattern.component.html',
  styleUrls: ['./output-pattern.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OutputPatternComponent,
      multi: true,
    },
  ],
})
export class OutputPatternComponent extends ValueAccessorBase<number> implements OnInit {
  @Input() patternSize: number | Observable<number> = this._defaultPatternSize;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  checkboxes: number[] = [];
  uuid = `${Math.random()}`;

  private _disableChangePropagation = false;
  _patternSize: number;

  constructor(@Inject(TOKEN_PATTERN_SIZE) private readonly _defaultPatternSize: number) {
    super(0);
  }

  private _initCheckboxes() {
    this.checkboxes.splice(0);
    for (let i = 0; i < this._patternSize; i++) {
      const value = (this.value >> i) & 1;
      this.checkboxes.push(value);
    }
  }

  private _drawPattern() {
    if (this.canvas === undefined) {
      return;
    }
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
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
      const value = (this.value >> i) & 1;
      if (value === 1) {
        x += patternWidth / 2;
        graphics.lineTo(x, y);
        y -= patternHeight;
        graphics.lineTo(x, y);
        x += patternWidth / 2;
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
      this.patternSize.subscribe((patternSize: number) => {
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
  onResize() {
    this._drawPattern();
  }

  handleCheckboxChange(event: Event, index: number) {
    if (this._disableChangePropagation) {
      return;
    }

    const checked = (event.target as HTMLInputElement).checked;
    const x = checked ? 1 : 0;
    this.value ^= (-x ^ this.value) & (1 << (this._patternSize - index - 1));
    this._drawPattern();
  }

  handleEmptyPattern() {
    this.value = 0;
    this._initCheckboxes();
    this._drawPattern();
  }

  handleFullPattern() {
    this.value = 0xffffffff;
    this._initCheckboxes();
    this._drawPattern();
  }

  handleInvertPattern() {
    this.value = ~this.value;
    this._initCheckboxes();
    this._drawPattern();
  }

  handleRandomPattern() {
    this.value = Math.floor(Math.random() * 1000000000);
    this._initCheckboxes();
    this._drawPattern();
  }
}
