import { browser} from 'protractor';
import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeReaPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/rea/new') as Promise<any>;
  }



}
