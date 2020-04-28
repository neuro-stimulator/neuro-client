import { browser } from 'protractor';

import { SequencesHelper } from '../../../sequences/sequences-helper.spec';
import { SequencePage } from '../../../sequences/sequence/sequence.po';
import { SequencesPage } from '../../../sequences/sequences.po';
import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeErpPage extends ExperimentTypeAbstractPage {

  public static readonly DEFAULT_SEQUENCE_NAME = 'sequence';
  public static readonly DEFAULT_SEQUENCE_SIZE = 20;

  private readonly sequenceHelper = new SequencesHelper(new SequencesPage(), new SequencePage());

  navigateTo(): Promise<any> {
    return browser.get('/experiments/erp/new') as Promise<any>;
  }

  async afterExperimentCreated(): Promise<void> {
    // Získám název experimentu
    const name = await this.fieldExperimentName.getText();

    // Nechám založit novou sekvenci
    await this.sequenceHelper.createSequence(
      ExperimentTypeErpPage.DEFAULT_SEQUENCE_NAME,
      ExperimentTypeErpPage.DEFAULT_SEQUENCE_SIZE,
      'ERP'
    );

    return super.changeFieldValues();
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
