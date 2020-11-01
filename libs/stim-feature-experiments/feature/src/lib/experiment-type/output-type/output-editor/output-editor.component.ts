import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { HorizontalAlignment, Output, VerticalAlignment } from '@stechy1/diplomka-share';

import { DialogChildComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { SettingsFacade, SettingsState } from '@diplomka-frontend/stim-feature-settings/domain';

import { OutputEntry } from './output-entry';
import { skip, take } from 'rxjs/operators';
import { OutputEditorActions, OutputEditorArgs } from './output-editor.args';

@Component({
  selector: 'diplomka-frontend-output-editor',
  templateUrl: './output-editor.component.html',
  styleUrls: ['./output-editor.component.scss'],
})
export class OutputEditorComponent extends DialogChildComponent implements OnInit, AfterContentInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  @Input() outputEntries: OutputEntry[] = [];
  private realViewport: {
    x: number;
    y: number;
  } = { x: 640, y: 480 };

  private _canvasHeightMultiplier = 0.5;

  private readonly vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  private readonly _resultEmitter: EventEmitter<OutputEntry[]> = new EventEmitter<OutputEntry[]>();

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
  private _confirmSubscription: Subscription;
  private _enableCoordinatesLines: boolean;
  private _actions: OutputEditorActions;

  public selectedID = -1;

  public readonly controlPositionX = new FormControl();
  public readonly controlPositionY = new FormControl();
  public readonly manualAlignment = new FormControl();
  public readonly synchronizeWithAssetPlayer = new FormControl(false);
  public readonly HorizontalAlignment = HorizontalAlignment;

  constructor(private readonly settings: SettingsFacade) {
    super();
  }

  private _drawOutputs() {
    if (this.canvas === undefined) {
      return;
    }
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = this.vh * this._canvasHeightMultiplier;
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
      graphics.fillRect(outputEntry.x - this._outputSize2, outputEntry.y - this._outputSize2, this._outputSize, this._outputSize);
      // Pokud je obrázek vybraný
      if (outputEntry.selected) {
        // Dodatečně nakreslím obdélník
        graphics.save();
        graphics.strokeStyle = 'green';
        graphics.lineWidth = 3;
        graphics.strokeRect(outputEntry.x - this._outputSize2 - 1, outputEntry.y - this._outputSize2 - 1, this._outputSize + 1, this._outputSize + 1);
        graphics.restore();
      }
    }

    if (!window.TouchEvent && this._enableCoordinatesLines) {
      graphics.strokeStyle = 'red';
      graphics.moveTo(this._startX, 0);
      graphics.lineTo(this._startX, height);
      graphics.moveTo(0, this._startY);
      graphics.lineTo(width, this._startY);
      graphics.stroke();
      graphics.strokeStyle = 'black';
      graphics.strokeText(`${Math.round((this._startX / canvas.width) * this.realViewport.x)}`, this._startX, height - 1);
      graphics.strokeText(`${Math.round((this._startY / canvas.height) * this.realViewport.y)}`, 1, this._startY);
    }
  }

  private _onValueChange(value: number, identifier: string) {
    if (this._dragging || this.selectedID === -1 || this._coordinatesRefresh) {
      return;
    }

    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    const outputEntry = this.outputEntries.filter((entry) => entry.id === this.selectedID)[0];
    outputEntry[identifier] = Math.round((value / this.realViewport[identifier]) * (identifier === 'x' ? canvas.width : canvas.height));
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

    const outputEntry = this.outputEntries.filter((entry) => entry.id === this.selectedID)[0];
    outputEntry.manualAlignment = value;
  }

  private _fromVirtualCoordinates(outputEntries: OutputEntry[]) {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    for (const outputEntry of outputEntries) {
      outputEntry.x = Math.round((outputEntry.x / canvas.width) * this.realViewport.x);
      outputEntry.y = Math.round((outputEntry.y / canvas.height) * this.realViewport.y);
    }
  }

  private _toVirtualCoordinates(outputEntries: OutputEntry[]) {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = this.vh * this._canvasHeightMultiplier;
    const BB = canvas.getBoundingClientRect();
    const width = canvas.width;
    const height = canvas.height;
    this._offsetX = BB.left;
    this._offsetY = BB.top;
    this._outputSize = Math.min(width, height) / 8;
    this._outputSize2 = this._outputSize / 2;

    for (const outputEntry of outputEntries) {
      outputEntry.x = Math.round((outputEntry.x / this.realViewport.x) * width);
      outputEntry.y = Math.round((outputEntry.y / this.realViewport.y) * height);
    }
  }

  private _handleConfirm() {
    const outputEntries = [...this.outputEntries];
    this._fromVirtualCoordinates(outputEntries);
    this._resultEmitter.next(outputEntries);
  }

  ngOnInit(): void {
    this.controlPositionX.valueChanges.subscribe((valueX) => this._onValueChange(+valueX, 'x'));
    this.controlPositionY.valueChanges.subscribe((valueY) => this._onValueChange(+valueY, 'y'));
    this.manualAlignment.valueChanges.subscribe((value) => this._onManualAlignmentChange(value));
    this.synchronizeWithAssetPlayer.valueChanges.subscribe((synchronize) => this._actions?.toggleSynchronize.next(synchronize));
    this.settings.state.pipe(skip(1), take(1)).subscribe((settings: SettingsState) => {
      this._canvasHeightMultiplier = settings.localSettings.experiments.outputEditor.canvasHeightMultiplier;
      this.realViewport.x = settings.serverSettings.assetPlayer?.width;
      this.realViewport.y = settings.serverSettings.assetPlayer?.height;
      this._toVirtualCoordinates(this.outputEntries);
      this._drawOutputs();
    });
  }

  ngAfterContentInit(): void {
    this.settings.loadServerSettings();
  }

  bind(modal: ModalComponent) {
    modal.title = 'EXPERIMENTS.OUTPUT_EDITOR.TITLE';
    modal.confirmText = 'EXPERIMENTS.OUTPUT_EDITOR.CONFIRM';
    modal.cancelText = 'EXPERIMENTS.OUTPUT_EDITOR.CANCEL';
    modal.result = this._resultEmitter;

    this._confirmSubscription = modal.confirm.subscribe(() => {
      this._handleConfirm();
    });
    this._showSubscription = modal.show.subscribe((args: OutputEditorArgs) => {
      this.outputEntries = args.outputs.map((output: Output) => {
        return {
          ...output,
          selected: false,
          dragging: false,
        };
      });
      this._actions = args[0].actions;
    });
  }

  unbind() {
    this._showSubscription.unsubscribe();
    this._confirmSubscription.unsubscribe();
    this._actions?.toggleSynchronize.emit(false);
  }

  handleCanvasClick() {
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
      if (mx > outputEntry.x - this._outputSize2 && mx < outputEntry.x + this._outputSize2 && my > outputEntry.y - this._outputSize2 && my < outputEntry.y + this._outputSize2) {
        this.selectedID = outputEntry.id;
        this._manualAlignmentRefresh = true;
        this.manualAlignment.setValue(outputEntry.manualAlignment);
        this._manualAlignmentRefresh = false;

        outputEntry.selected = true;
        if (outputEntry.manualAlignment) {
          this._dragging = true;
          outputEntry.dragging = true;
        }

        this.controlPositionX.setValue(Math.round((outputEntry.x / canvas.width) * this.realViewport.x));
        this.controlPositionY.setValue(Math.round((outputEntry.y / canvas.height) * this.realViewport.y));
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

          if (this.synchronizeWithAssetPlayer.value) {
            this._actions?.synchronizeEvent.emit({
              id: outputEntry.id,
              x: (this._startX / canvas.width) * this.realViewport.x,
              y: (this._startY / canvas.height) * this.realViewport.y,
            });
          }

          break;
        }
      }
      this.controlPositionX.setValue(Math.round((this._startX / canvas.width) * this.realViewport.x));
      this.controlPositionY.setValue(Math.round((this._startY / canvas.height) * this.realViewport.y));
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

  handleCanvasPointerEnter() {
    this._enableCoordinatesLines = true;
  }

  handleCanvasPointerLeave() {
    this._enableCoordinatesLines = false;
    this._dragging = false;
    for (const outputEntry of this.outputEntries) {
      outputEntry.dragging = false;
    }
    this._drawOutputs();
  }

  handleSetOutputHorizontalAlignment(alignment: HorizontalAlignment) {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    const outputEntry = this.outputEntries.filter((entry) => entry.id === this.selectedID)[0];

    outputEntry.horizontalAlignment = alignment;

    switch (alignment) {
      case HorizontalAlignment.LEFT:
        outputEntry.x = Math.round((outputEntry.width / 2 / this.realViewport.x) * canvas.width);
        break;
      case HorizontalAlignment.CENTER:
        outputEntry.x = canvas.width / 2;
        outputEntry.y = canvas.height / 2;
        outputEntry.verticalAlignment = VerticalAlignment.CENTER;
        break;
      case HorizontalAlignment.RIGHT:
        outputEntry.x = Math.round(((this.realViewport.x - outputEntry.width / 2) / this.realViewport.x) * canvas.width);
        break;
    }

    this._coordinatesRefresh = true;
    this.controlPositionX.setValue(Math.round((outputEntry.x / canvas.width) * this.realViewport.x));
    this.controlPositionY.setValue(Math.round((outputEntry.y / canvas.height) * this.realViewport.y));
    this._coordinatesRefresh = false;
    this._drawOutputs();
  }

  handleMoveOutputVerticalAlignmentUp() {
    const outputEntry = this.outputEntries.filter((entry) => entry.id === this.selectedID)[0];
    if (outputEntry.verticalAlignment === VerticalAlignment.TOP) {
      return;
    }

    outputEntry.verticalAlignment++;
    this._computeVerticalAlignment(outputEntry);
  }

  handleMoveOutputVerticalAlignmentDown() {
    const outputEntry = this.outputEntries.filter((entry) => entry.id === this.selectedID)[0];
    if (outputEntry.verticalAlignment === VerticalAlignment.BOTTOM) {
      return;
    }
    outputEntry.verticalAlignment--;
    this._computeVerticalAlignment(outputEntry);
  }

  private _computeVerticalAlignment(outputEntry: OutputEntry) {
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;

    switch (outputEntry.verticalAlignment) {
      case VerticalAlignment.TOP:
        outputEntry.y = Math.round((outputEntry.height / 2 / this.realViewport.y) * canvas.height);
        break;
      case VerticalAlignment.CENTER:
        outputEntry.y = canvas.height / 2;
        break;
      case VerticalAlignment.BOTTOM:
        outputEntry.y = Math.round(((this.realViewport.y - outputEntry.height / 2) / this.realViewport.y) * canvas.height);
        break;
    }

    this._coordinatesRefresh = true;
    this.controlPositionX.setValue(Math.round((outputEntry.x / canvas.width) * this.realViewport.x));
    this.controlPositionY.setValue(Math.round((outputEntry.y / canvas.height) * this.realViewport.y));
    this._coordinatesRefresh = false;

    this._drawOutputs();
  }
}
