import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarVehiculoComponent } from './components/listar-vehiculo/listar-vehiculo.component';
import { CrearVehiculoComponent } from './components/crear-vehiculo/crear-vehiculo.component';

const routes: Routes = [
    { path: 'lista', component: ListarVehiculoComponent },
    { path: 'crear', component: CrearVehiculoComponent },
    { path: 'editar/:id', component: CrearVehiculoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehiculosRoutingModule { }