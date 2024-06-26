import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalService } from '../../core/services/modal.service';

export function modalServiceFactory(modal: NzModalService) {
    return new ModalService(modal);
}