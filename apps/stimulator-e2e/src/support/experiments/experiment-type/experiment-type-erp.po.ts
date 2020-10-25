import { ExperimentTypeAbstractPage } from './experiment-type-abstract.po';
import { SequencesHelper } from '../../../integration/sequences/sequences-helper.spec';
import { SequencesPage } from '../../sequences/sequences.po';
import { SequencePage } from '../../sequences/sequence/sequence.po';

export class ExperimentTypeErpPage extends ExperimentTypeAbstractPage {

  public static readonly DEFAULT_SEQUENCE_NAME = 'sequence';
  public static readonly DEFAULT_SEQUENCE_SIZE = 20;

  private readonly sequenceHelper = new SequencesHelper(new SequencesPage(), new SequencePage());

  navigateTo(): void {
    cy.visit('/experiments/erp/new');
  }

  afterExperimentCreated(): void {
    // Získám název experimentu
    const name = this.fieldExperimentName.invoke('text');

    // Nechám založit novou sekvenci
    this.sequenceHelper.createSequence(
      ExperimentTypeErpPage.DEFAULT_SEQUENCE_NAME,
      ExperimentTypeErpPage.DEFAULT_SEQUENCE_SIZE,
      'ERP'
    );

    super.changeFieldValues();
  }

  getPageInputs(): {ids?: string[], classes?: {name: string, count: number}[]} {
    return {
      ids: [
        'erp-random',
        'erp-output-count',
        'erp-wait',
        'erp-out',
        'erp-max-dstribution',
        'erp-edge'
      ],
      classes: [
        { name: 'erp-pulse-up', count: 1 },
        { name: 'erp-pulse-down', count: 1 },
        { name: 'erp-distribution', count: 1 },
        { name: 'erp-brightness', count: 1 },
        { name: 'erp-dependencies', count: 1 },
      ]
    };
  }
}
