import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './components/clientes-routing.module';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListarClienteComponent, CrearClienteComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NgZorroModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
