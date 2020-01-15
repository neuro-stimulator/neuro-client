import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-sequence-viewer',
  templateUrl: './sequence-viewer.component.html',
  styleUrls: ['./sequence-viewer.component.sass']
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
        formatter: (value, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    }
  };
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  readonly pieChartType: ChartType = 'pie';
  readonly pieChartLegend = true;
  readonly pieChartPlugins = [pluginDataLabels];
  readonly pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)',
        '#0b0033', '#370031', '#832232', '#ce8964', '#eaf27c'
      ],
    },
  ];

  @Input() inputData: Observable<{data: number[], analyse: {}}>;
  @Input() outputCount: Observable<number>;
  flowData: number[] = [];
  private _outputCount: number;
  private _analyse: {};
  readonly outputs: number[] = [];

  private _inputDataSubscription: Subscription;
  private _outputCountSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this._inputDataSubscription = this.inputData.subscribe(input => {
      this.pieChartLabels.splice(0);
      this.pieChartData.splice(0);
      this.flowData.splice(0);
      this.flowData.push(...input.data);
      this._analyse = input.analyse;
      this._showSequenceAnalyse(input.analyse);
    });
    this._outputCountSubscription = this.outputCount.subscribe(outputCount => {
      this._outputCount = outputCount;
      if (!this._analyse) {
        return;
      }

      this.pieChartLabels.splice(0);
      this.pieChartData.splice(0);
      this._showSequenceAnalyse(this._analyse);
    });
  }

  ngOnDestroy(): void {
    this._inputDataSubscription.unsubscribe();
    this._outputCountSubscription.unsubscribe();
  }

  private _showSequenceAnalyse(analyse: {}) {
    this.outputs.splice(0);
    for (let i = 0; i <= this._outputCount; i++) {
      this.outputs.push(i);
    }

    for (const key of Object.keys(analyse)) {
      const data = analyse[key];
      this.pieChartLabels.push(key);
      this.pieChartData.push(data['value']);
    }
  }
}
