import { browser} from 'protractor';
import { ExperimentTypeAbstractPage } from '../experiment-type-abstract.po';

export class ExperimentTypeCvepPage extends ExperimentTypeAbstractPage {

  navigateTo(): Promise<any> {
    return browser.get('/experiments/cvep/new') as Promise<any>;
  }



}
