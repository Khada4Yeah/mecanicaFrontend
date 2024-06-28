import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalService } from './modal.service';

export function modalServiceFactory(modal: NzModalService) {
    return new ModalService(modal);
}