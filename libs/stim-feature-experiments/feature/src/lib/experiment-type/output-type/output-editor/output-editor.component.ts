import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  HorizontalAlignment,
  Output,
  VerticalAlignment,
} from '@stechy1/diplomka-share';

import {
  DialogChildComponent,
  ModalComponent,
} from '@diplomka-frontend/stim-lib-modal';
import { OutputEntry } from './output-entry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'diplomka-frontend-output-editor',
  templateUrl: './output-editor.component.html',
  styleUrls: ['./output-editor.component.scss'],
})
export class OutputEditorComponent
  extends DialogChildComponent
  implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  @Input() outputEntries: OutputEntry[] = [];
  @Input() realViewport: {
    x: number;
    y: number;
  } = { x: 640, y: 480 };

  private readonly vh =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) * 0.5;

  private _dragging = false;
  private _offsetX: number;
  private _offsetY: number;
  private _outputSize: number;
  private _outputSize2: number;
  private _startX: number;
  private _startY: number;

  private _coordinatesRefresh: boolean;
  private _manualAlignmentRefresh: boolean;
  private _showSubscription: Subscription;

  public selectedID: number = -1;

  public readonly controlPositionX = new FormControl();
  public readonly controlPositionY = new FormControl();
  public readonly manualAlignment = new FormControl();
  public readonly HorizontalAlignment = HorizontalAlignment;

  constructor() {
    super();
  }

  private _drawOutputs() {
    if (this.canvas === undefined) {
      return;
    }
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = this.vh;
    const BB = canvas.getBoundingClientRect();
    const graphics = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    this._offsetX = BB.left;
    this._offsetY = BB.top;
    this._outputSize = Math.min(width, height) / 8;
    this._outputSize2 = this._outputSize / 2;

    // vyčištění plátna
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    // obdélník ukazující hranici plátna
    graphics.strokeRect(0, 0, canvas.width, canvas.height);

    // iteruj přes všechny entry
    for (const outputEntry of this.outputEntries) {
      // Vyfiltruji pouze obrázky
      if (!outputEntry.outputType.image) {
        continue;
      }

      graphics.strokeStyle = 'black';
      graphics.lineWidth = 1;
      graphics.fillRect(
        outputEntry.x - this._outputSize2,
        outputEntry.y - this._outputSize2,
        this._outputSize,
        this._outputSize
      );
      // Pokud je obrázek vybraný
      if (outputEntry.selected) {
        // Dodatečně nakreslím obdélník
        graphics.save();
        graphics.strokeStyle = 'green';
        graphics.lineWidth = 3;
        graphics.strokeRect(
          outputEntry.x - this._outputSize2 - 1,
          outputEntry.y - this._outputSize2 - 1,
          this._outputSize + 1,
          this._outputSize + 1
        );
        graphics.restore();
      }
    }

    if (!window.TouchEvent) {
      graphics.strokeStyle = 'red';
      graphics.moveTo(this._startX, 0);
      graphics.lineTo(this._startX, height);
      graphics.moveTo(0, this._startY);
      graphics.lineTo(width, this._startY);
      graphics.stroke();
      graphics.strokeStyle = 'black';
      graphics.strokeText(
        `${Math.round((this._startX / canvas.width) * this.realViewport.x)}`,
        this._startX,
        height - 1
      );
      graphics.strokeText(
        `${Math.round((this._startY / canvas.height) * this.realViewport.y)}`,
        1,
        this._startY
      );
    }
  }

  private _onValueChange(value: number, identifier: string) {
    if (this._dragging || this.selectedID === -1 || this._coordinatesRefresh) {
      return;
    }

    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    const outputEntry = this.outputEntries.filter(
      (entry) => entry.id === this.selectedID
    )[0];
    outputEntry[identifier] = Math.round(
      (value / this.realViewport[identifier]) *
        (identifier === 'x' ? canvas.width : canvas.height)
    );
    if (!this._dragging) {
      this._coordinatesRefresh = true;
      this._drawOutputs();
      this._coordinatesRefresh = false;
    }
  }

  private _onManualAlignmentChange(value: boolean) {
    if (this._manualAlignmentRefresh || this.selectedID === -1) {
      return;
    }

    const outputEntry = this.outputEntries.filter(
      (entry) => entry.id === this.selectedID
    )[0];
    outputEntry.manualAlignment = value;
  }

  ngOnInit(): void {
    this.controlPositionX.valueChanges.subscribe((valueX) =>
      this._onValueChange(+valueX, 'x')
    );
    this.controlPositionY.valueChanges.subscribe((valueY) =>
      this._onValueChange(+valueY, 'y')
    );
    this.manualAlignment.valueChanges.subscribe((value) =>
      this._onManualAlignmentChange(value)
    );
  }

  bind(modal: ModalComponent) {
    modal.title = 'EXPERIMENTS.OUTPUT_EDITOR.TITLE';
    modal.confirmText = 'EXPERIMENTS.OUTPUT_EDITOR.CONFIRM';
    modal.cancelText = 'EXPERIMENTS.OUTPUT_EDITOR.CANCEL';

    // this._confirmSubscription = modal.confirm.subscribe(() => { this.filter.filterParameters = this.form.value; });
    // this._cancelSubscription = modal.cancel.subscribe(() => { this.filter.resetFilterParameters(); });
    this._showSubscription = modal.show.subscribe(
      (args: [{ outputs: Output[] }]) => {
        this.outputEntries = args[0].outputs.map((output: Output) => {
          return {
            ...output,
            selected: false,
            dragging: false,
          };
        });
        //   this.form.setValue(this.filter.filterParameters);
        //   this._lastConfiguration = this.filter.filterParameters;
      }
    );
  }

  unbind(param: ModalComponent) {}

  handleCanvasClick($event: MouseEvent) {
    this._drawOutputs();
  }

  handleCanvasPointerDown($event: PointerEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    const mx = $event.clientX - this._offsetX;
    const my = $event.clientY - this._offsetY;

    this._dragging = false;
    this.selectedID = -1;
    for (const outputEntry of this.outputEntries) {
      outputEntry.selected = false;
      this.controlPositionX.setValue(null);
      this.controlPositionY.setValue(null);
      this.manualAlignment.setValue(null);
    }

    for (const outputEntry of this.outputEntries) {
      // základní obdélníkový bounding box
      if (
        mx > outputEntry.x - this._outputSize2 &&
        mx < outputEntry.x + this._outputSize2 &&
        my > outputEntry.y - this._outputSize2 &&
        my < outputEntry.y + this._outputSize2
      ) {
        this.selectedID = outputEntry.id;
        this._manualAlignmentRefresh = true;
        this.manualAlignment.setValue(outputEntry.manualAlignment);
        this._manualAlignmentRefresh = false;

        outputEntry.selected = true;
        if (outputEntry.manualAlignment) {
          this._dragging = true;
          outputEntry.dragging = true;
        }

        this.controlPositionX.setValue(
          Math.round((outputEntry.x / canvas.width) * this.realViewport.x)
        );
        this.controlPositionY.setValue(
          Math.round((outputEntry.y / canvas.height) * this.realViewport.y)
        );
        break;
      }
    }

    this._startX = mx;
    this._startY = my;

    this._drawOutputs();
  }

  handleCanvasPointerMove($event: PointerEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    const mx = $event.clientX - this._offsetX;
    const my = $event.clientY - this._offsetY;

    if (this._dragging) {
      const dx = mx - this._startX;
      const dy = my - this._startY;

      for (const outputEntry of this.outputEntries) {
        if (outputEntry.dragging) {
          outputEntry.x += dx;
          outputEntry.y += dy;
        }
      }
      this.controlPositionX.setValue(
        Math.round((this._startX / canvas.width) * this.realViewport.x)
      );
      this.controlPositionY.setValue(
        Math.round((this._startY / canvas.height) * this.realViewport.y)
      );
    }

    this._startX = mx;
    this._startY = my;

    this._drawOutputs();
  }

  handleCanvasPointerUp($event: PointerEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this._dragging = false;
    for (const outputEntry of this.outputEntries) {
      outputEntry.dragging = false;
    }
  }

  handleCanvasPointerEnter($event: PointerEvent) {}

  handleCanvasPointerLeave($event: PointerEvent) {}

  handleSetOutputHorizontalAlignment(alignment: HorizontalAlignment) {
    const outputEntry = this.outputEntries.filter(
      (entry) => entry.id === this.selectedID
    )[0];
    outputEntry.horizontalAlignment = alignment;
    outputEntry.x = 0;
  }

  handleMoveOutputVerticalAlignmentUp() {
    const outputEntry = this.outputEntries.filter(
      (entry) => entry.id === this.selectedID
    )[0];
    if (outputEntry.verticalAlignment === VerticalAlignment.TOP) {
      return;
    }

    outputEntry.verticalAlignment++;
  }

  handleMoveOutputVerticalAlignmentDown() {
    const outputEntry = this.outputEntries.filter(
      (entry) => entry.id === this.selectedID
    )[0];
    if (outputEntry.verticalAlignment === VerticalAlignment.BOTTOM) {
      return;
    }
    outputEntry.verticalAlignment--;
  }
}
