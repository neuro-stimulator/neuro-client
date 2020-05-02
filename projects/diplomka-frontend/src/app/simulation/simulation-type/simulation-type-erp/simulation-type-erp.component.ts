import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable} from 'rxjs';

import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { Experiment, ExperimentERP } from '@stechy1/diplomka-share';
import { SequenceService } from '../../../share/sequence.service';
import { SimulationTypeComponent } from '../simulation-type.component';
import { ExperimentsService } from '../../../experiments/experiments.service';

@Component({
  selector: 'stim-simulation-type-erp',
  templateUrl: './simulation-type-erp.component.html',
  styleUrls: ['./simulation-type-erp.component.sass']
})
export class SimulationTypeErpComponent implements OnInit, OnDestroy, SimulationTypeComponent {

  private readonly _progress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly progress$: Observable<number> = this._progress.asObservable();

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

  flowData: number[] = [];

  readonly outputs: number[] = [];

  private experimentID: number;

  constructor(private readonly _service: SequenceService,
              private readonly _experiments: ExperimentsService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }

  private _handleParams(params: Params) {
    if (params['id'] === undefined) {
      this.router.navigate(['experiments']);
      return;
    }

    this.experimentID = +params['id'];
    this.pieChartLabels.splice(0);
    this.pieChartData.splice(0);
  }

  ngOnInit() {
    this._handleParams(this.route.snapshot.params);
  }

  ngOnDestroy(): void {
  }

  generateSequence(sequenceSize: number): Observable<number> {
    this.pieChartLabels.splice(0);
    this.pieChartData.splice(0);

    this._service.generate(this.experimentID, sequenceSize, progress => { this._progress.next(progress); })
        .then((result: {experiment: Experiment, sequence: number[], analyse: any}) => {
          this.flowData = result.sequence;
          const experiment = result.experiment as ExperimentERP;
          const analyse = result.analyse;

          this.outputs.splice(0);
          for (let i = 0; i <= experiment.outputCount; i++) {
            this.outputs.push(i);
          }

          delete analyse['0'];
          for (const key of Object.keys(analyse)) {
            const data = analyse[key];
            this.pieChartLabels.push(key);
            this.pieChartData.push(data['value']);
          }

          return this.router.navigate([], {fragment: 'result', relativeTo: this.route});
        });
    return this.progress$;
  }

  installExperiment(): Observable<number> {
    this._progress.next(0);

    this._experiments.install(this.experimentID, this.flowData, progress => { this._progress.next(progress); })
        .then(result => {

        });

    return this.progress$;
  }
}
