import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private router = inject(Router);

  constructor(private modalService: NzModalService) { }

  mostrar(type: 'error' | 'success' | 'info' | 'warning', mensaje: string, ruta?: string) {
    switch (type) {
      case 'error':
        this.modalService.error({
          nzTitle: 'Error',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        break;
      case 'success':
        this.modalService.success({
          nzTitle: 'Success',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        this.modalService.afterAllClose.subscribe(() => {
          if (ruta) {
            this.router.navigate([ruta]);
          }
        });
        break;
      case 'info':
        this.modalService.info({
          nzTitle: 'Info',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        break;
      case 'warning':
        this.modalService.warning({
          nzTitle: 'Warning',
          nzContent: mensaje.replace(/\n/g, '<br>'),
          nzStyle: { whiteSpace: 'pre-line' }
        });
        break;
      default:
        throw new Error(`Unsupported modal type: ${type}`);
    }
  }
}
