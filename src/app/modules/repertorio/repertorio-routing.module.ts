import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepertorioComponent } from './repertorio.component';
import { CancionAddComponent } from './cancion/cancion-add/cancion-add.component';
import { OpcionAddComponent } from './cancion/opcion/opcion-add/opcion-add.component';
import { RepertorioAddComponent } from './repertorio-add/repertorio-add.component';
import { RepertorioDeleteComponent } from './repertorio-delete/repertorio-delete.component';
import { RepertorioListComponent } from './repertorio-list/repertorio-list.component';
import { RepertorioEditComponent } from './repertorio-edit/repertorio-edit.component';

const routes: Routes = [{
  path: '',
  component: RepertorioComponent,
  children: [
    {
      path: 'registro',
      component: RepertorioAddComponent
    },
    {
      path: 'eliminar',
      component: RepertorioDeleteComponent
    },
    {
      path: 'list',
      component: RepertorioListComponent
    },
    {
      path: 'list/editar/:id',
      component: RepertorioEditComponent
    },
    {
      path: 'list/canciones/:id',
      component: CancionAddComponent
    },
    {
      path: 'list/canciones/opciones/:id',
      component: OpcionAddComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepertorioRoutingModule { }
