import { ModalComponent } from './modal.component';

export abstract class DialogChildComponent {

  abstract bind(param: ModalComponent);

  abstract unbind(param: ModalComponent);

}
