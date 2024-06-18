//crear rountig de fichas
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFichaComponent } from './components/crear-ficha/crear-ficha.component';
import { ListarFichaComponent } from './components/listar-ficha/listar-ficha.component';

const routes: Routes = [
    { path: 'crear', component: CrearFichaComponent },
    { path: 'lista', component: ListarFichaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FichasRoutingModule { }