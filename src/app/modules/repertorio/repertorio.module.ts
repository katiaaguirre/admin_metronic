import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepertorioRoutingModule } from './repertorio-routing.module';
import { RepertorioListComponent } from './repertorio-list/repertorio-list.component';
import { RepertorioAddComponent } from './repertorio-add/repertorio-add.component';
import { RepertorioDeleteComponent } from './repertorio-delete/repertorio-delete.component';
import { RepertorioEditComponent } from './repertorio-edit/repertorio-edit.component';
import { CancionAddComponent } from './cancion/cancion-add/cancion-add.component';
import { CancionEditComponent } from './cancion/cancion-edit/cancion-edit.component';
import { CancionDeleteComponent } from './cancion/cancion-delete/cancion-delete.component';
import { OpcionAddComponent } from './cancion/opcion/opcion-add/opcion-add.component';
import { OpcionEditComponent } from './cancion/opcion/opcion-edit/opcion-edit.component';
import { OpcionDeleteComponent } from './cancion/opcion/opcion-delete/opcion-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular';
import { OpcionFileDeleteComponent } from './cancion/opcion/opcion-file-delete/opcion-file-delete.component';


@NgModule({
  declarations: [
    RepertorioListComponent,
    RepertorioAddComponent,
    RepertorioDeleteComponent,
    RepertorioEditComponent,
    CancionAddComponent,
    CancionEditComponent,
    CancionDeleteComponent,
    OpcionAddComponent,
    OpcionEditComponent,
    OpcionDeleteComponent,
    OpcionFileDeleteComponent
  ],
  imports: [
    CommonModule,
    RepertorioRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class RepertorioModule { }
