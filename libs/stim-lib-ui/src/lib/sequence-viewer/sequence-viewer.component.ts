import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'stim-lib-ui-sequence-viewer',
  templateUrl: './sequence-viewer.component.html',
  styleUrls: ['./sequence-viewer.component.sass'],
})
export class SequenceViewerComponent {
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
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', '#0b0033', '#370031', '#832232', '#ce8964', '#eaf27c'],
    },
  ];

  @Input() editable = false;
  flowData: number[] = [];
  readonly outputs: number[] = [];
  @Output() update: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() dataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataHasChanged = false;
  _originalData: number[];
  private _analyse: Record<string, string>;

  private _outputCount: number;

  @Input() set outputCount(outputCount: number) {
    this._outputCount = outputCount;
    this._showSequenceAnalyse(this._analyse);
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

  handleStimulChange(i: number, output: number) {
    if (!this.editable) {
      return;
    }

    this.flowData[i] = output;
    this._analyse = this._analyseSequence(this.flowData);
    this._showSequenceAnalyse(this._analyse);
    this.dataHasChanged = true;
    this.dataChanged.emit(true);
  }

  handleUpdate() {
    this.update.emit([...this.flowData]);
  }

  handleCancelUpdate() {
    this.flowData.splice(0);
    this.flowData.push(...this._originalData);
    this._analyse = this._analyseSequence(this.flowData);
    this._showSequenceAnalyse(this._analyse);
    this.dataHasChanged = false;
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

  private _showSequenceAnalyse(analyse: Record<string, string>) {
    this.pieChartLabels.splice(0);
    this.pieChartData.splice(0);
    this.outputs.splice(0);
    for (let i = 0; i < this._outputCount; i++) {
      this.outputs.push(i);
    }

    for (const key of Object.keys(analyse)) {
      const data = analyse[key];
      this.pieChartLabels.push(`${+key+1}. (${data['percent'] * 100}%)`);
      this.pieChartData.push(data['value']);
    }
  }
}
