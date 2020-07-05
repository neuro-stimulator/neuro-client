import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'stim-lib-ui-sequence-viewer',
  templateUrl: './sequence-viewer.component.html',
  styleUrls: ['./sequence-viewer.component.sass'],
})
export class SequenceViewerComponent implements OnInit, OnDestroy {
  // Pie
  readonly pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, _): string => `#${value}`,
      },
    },
  };
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  readonly pieChartType: ChartType = 'pie';
  readonly pieChartLegend = true;
  readonly pieChartPlugins = [pluginDataLabels];
  readonly pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
        '#0b0033',
        '#370031',
        '#832232',
        '#ce8964',
        '#eaf27c',
      ],
    },
  ];

  @Input() editable = false;
  flowData: number[] = [];
  private _analyse: {};
  readonly outputs: number[] = [];
  private _outputCount: number;

  @Output() update: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() dataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  dataHasChanged = false;
  _originalData: number[];

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  private _analyseSequence(sequence: number[]) {
    const map = {};
    for (const value of sequence) {
      if (map[value] === undefined) {
        map[value] = {};
        map[value]['value'] = 1;
      } else {
        map[value]['value']++;
      }
    }

    for (const key of Object.keys(map)) {
      map[key]['percent'] = map[key]['value'] / sequence.length;
    }

    // delete map['0'];
    return map;
  }

  private _showSequenceAnalyse(analyse: {}) {
    this.pieChartLabels.splice(0);
    this.pieChartData.splice(0);
    this.outputs.splice(0);
    for (let i = 0; i < this._outputCount; i++) {
      this.outputs.push(i);
    }

    for (const key of Object.keys(analyse)) {
      const data = analyse[key];
      this.pieChartLabels.push(`${key} (${data.percent * 100}%)`);
      this.pieChartData.push(data['value']);
    }
  }

  handleStimulChange(i: number, output: number) {
    if (!this.editable) {
      return;
    }

    this.flowData[i] = output;
    this._analyse = this._analyseSequence(this.flowData);
    this._showSequenceAnalyse(this._analyse);
    this.dataHasChanged = true;
    this.dataChanged.next(true);
  }

  handleUpdate() {
    this.update.next([...this.flowData]);
  }

  handleCancelUpdate() {
    this.flowData.splice(0);
    this.flowData.push(...this._originalData);
    this._analyse = this._analyseSequence(this.flowData);
    this._showSequenceAnalyse(this._analyse);
    this.dataHasChanged = false;
  }

  get outputCountArray(): number[] {
    return new Array(this._outputCount ?? 0);
  }

  @Input() set inputData(inputData: number[]) {
    this.flowData.splice(0);
    this.flowData.push(...inputData);
    this._analyse = this._analyseSequence(inputData);
    this._showSequenceAnalyse(this._analyse);
  }

  @Input() set outputCount(outputCount: number) {
    this._outputCount = outputCount;
    this._showSequenceAnalyse(this._analyse);
  }
}
