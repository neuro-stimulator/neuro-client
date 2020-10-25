import { ExperimentTypeAbstractPage } from './experiment-type-abstract.po';

export class ExperimentTypeTvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): void {
    cy.visit('/experiments/tvep/new');
  }

  getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]} {
    return {
      ids: [
        'tvep-output-count'
      ],
      classes: [
        { name: 'tvep-pattern-length', count: 1 },
        { name: 'tvep-out', count: 1 },
        { name: 'tvep-wait', count: 1 },
        { name: 'tvep-brightness', count: 1 },
        { name: 'output-pattern', count: 1 },
      ]
    };
  }
}
