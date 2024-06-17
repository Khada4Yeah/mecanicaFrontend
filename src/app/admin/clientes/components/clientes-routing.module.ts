import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';



const routes: Routes = [
    { path: 'lista', component: ListarClienteComponent },
    { path: 'crear', component: CrearClienteComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }