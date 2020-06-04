import { ExperimentTypeAbstractPage } from "./experiment-type-abstract.po";

export class ExperimentTypeReaPage extends ExperimentTypeAbstractPage {

  navigateTo(): void {
    cy.visit('/experiments/rea/new');
  }

  getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]} {
    return {
      ids: [
        'rea-output-count',
        'rea-cycle-count',
        'rea-wait-time-min',
        'rea-wait-time-max',
        'rea-miss-time',
        'rea-on-fail',
        'rea-brightness'
      ],
      classes: [
        // { name: 'output-pattern', count: 1 }
      ]
    };
  }
}
