import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FichasRoutingModule } from './fichas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarFichaComponent } from './components/editar-ficha/editar-ficha.component';
import { ListarFichaComponent } from './components/listar-ficha/listar-ficha.component';
import { CrearFichaComponent } from './components/crear-ficha/crear-ficha.component';



@NgModule({
  declarations: [
    EditarFichaComponent,
    ListarFichaComponent,
    CrearFichaComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FichasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

})
export class FichasModule { }
