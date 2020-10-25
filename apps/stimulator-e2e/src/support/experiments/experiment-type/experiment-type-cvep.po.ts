import { ExperimentTypeAbstractPage } from './experiment-type-abstract.po';

export class ExperimentTypeCvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): void {
    cy.visit('/experiments/cvep/new');
  }

  getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]} {
    return {
      ids: [
        'cvep-out',
        'cvep-wait',
        'cvep-bit-shift',
        'cvep-brightness',
      ],
      classes: [
        { name: 'output-pattern', count: 1 }
      ]
    };
  }
}
