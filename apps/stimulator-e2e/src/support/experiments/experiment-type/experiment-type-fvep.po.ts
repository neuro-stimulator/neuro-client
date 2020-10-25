import { ExperimentTypeAbstractPage } from './experiment-type-abstract.po';

export class ExperimentTypeFvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): void {
    cy.visit('/experiments/fvep/new');
  }

  getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]} {
    return {
      ids: [
        'fvep-output-count'
      ],
      classes: [
        { name: 'fvep-time-on', count: 1 },
        { name: 'fvep-time-off', count: 1 },
        { name: 'fvep-frequency', count: 1 },
        { name: 'fvep-duty-cycle', count: 1 },
        { name: 'fvep-brightness', count: 1 },
      ]
    };
  }
}
