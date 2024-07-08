import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private router = inject(Router);

  constructor(private modalService: NzModalService) { }

  mostrar(type: 'error' | 'success' | 'info' | 'warning', mensaje: string, ruta?: string) {
    let modal: NzModalRef;
    switch (type) {
      case 'error':
        modal = this.modalService.error({
          nzTitle: 'Error',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        break;
      case 'success':
        modal = this.modalService.success({
          nzTitle: 'Success',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        if (ruta) {
          modal.afterClose.subscribe(() => {
            this.router.navigate([ruta]);
          });
        }
        break;
      case 'info':
        modal = this.modalService.info({
          nzTitle: 'Información',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        break;
      case 'warning':
        modal = this.modalService.warning({
          nzTitle: 'Advertencia',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        break;
      default:
        throw new Error(`Unsupported modal type: ${type}`);
    }
  }
}