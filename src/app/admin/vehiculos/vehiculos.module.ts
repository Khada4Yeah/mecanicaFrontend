import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';

import { ListarVehiculoComponent } from './components/listar-vehiculo/listar-vehiculo.component';
import { CrearVehiculoComponent } from './components/crear-vehiculo/crear-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ListarVehiculoComponent, CrearVehiculoComponent]
})
export class VehiculosModule { }
