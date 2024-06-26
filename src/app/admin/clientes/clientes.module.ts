import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ModalService } from '../../core/services/modal.service';
import { modalServiceFactory } from './modal.service.provider';
import { NzModalService } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [ListarClienteComponent, CrearClienteComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: ModalService,
    useFactory: modalServiceFactory,
    deps: [NzModalService]
  }]
})
export class ClientesModule { }
