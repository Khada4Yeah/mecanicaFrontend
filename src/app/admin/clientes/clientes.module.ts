import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { ListarClienteComponent } from './components/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-routing.module';


@NgModule({
  declarations: [ListarClienteComponent, CrearClienteComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ClientesModule { }
