import { Component, OnInit } from '@angular/core';
import { RepertorioService } from '../../../service/repertorio.service';
import { OpcionEditComponent } from '../opcion-edit/opcion-edit.component';
import { OpcionDeleteComponent } from '../opcion-delete/opcion-delete.component';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-opcion-add',
  templateUrl: './opcion-add.component.html',
  styleUrls: ['./opcion-add.component.scss']
})
export class OpcionAddComponent implements OnInit {
  OPCIONES:any = [];
  isLoading:any;

  tonalidad:any;
  video:any = null;
  AUDIO:any = null;
  ARMONIAS:any = null;
  CUERDAS:any = null;
  METALES:any = null;
  BAJO:any = null;
  cancion_id:any;
  count_opciones:number = 0;
  constructor(public repertorioService:RepertorioService,
    public activatedRoute:ActivatedRoute, public toaster:Toaster,
    public modalService:NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.cancion_id = resp.id
    })
    this.isLoading = this.repertorioService.isLoading$;
    this.repertorioService.listOpciones(this.cancion_id).subscribe((resp:any) => {
      console.log(resp)
      this.OPCIONES = resp.opciones.data;
      this.count_opciones = resp.count_opciones;
    });
  }

  save(){
    if(!this.tonalidad){
    this.toaster.open({text: 'NECESITAS INGRESAR UN TITULO PARA LA OPCIÓN', caption: 'VALIDACIÓN', type: 'danger'});
      return;
    } 
    let formData = new FormData();
    formData.append("tonalidad",this.tonalidad);
    formData.append("video",this.video);
    formData.append("cancion_id",this.cancion_id);

    if(this.AUDIO){
      formData.append("audio", this.AUDIO);
    }

    if(this.ARMONIAS){
      formData.append("armonias", this.ARMONIAS);
    }

    if(this.CUERDAS){
      formData.append("cuerdas", this.CUERDAS);
    }

    if(this.METALES){
      formData.append("metales", this.METALES);
    }

    if(this.BAJO){
      formData.append("bajo", this.BAJO);
    }


    this.repertorioService.registerOpcion(formData).subscribe((resp:any) => {
      console.log(resp)
      this.toaster.open({text: 'LA OPCIÓN HA SIDO REGISTRADA CORRECTAMENTE', caption: 'SUCCESS', type: 'success'})
      this.OPCIONES.push(resp.opcion);
      this.tonalidad = null;
      this.video = null;
      this.AUDIO = null;
      this.ARMONIAS = null;
      this.CUERDAS = null;
      this.METALES = null;
      this.BAJO = null;
    });
  }

  editOpcion(OPCION:any){
    const modalRef = this.modalService.open(OpcionEditComponent, {centered: true, size: 'lg'});
    modalRef.componentInstance.opcion_selected = OPCION;

    modalRef.componentInstance.OpcionE.subscribe((OPCION:any) => {
      let INDEX = this.OPCIONES.findIndex((item:any) => item.id == OPCION.id);
      this.OPCIONES[INDEX] = OPCION;
    })
  }

  deleteOpcion(OPCION:any){
    const modalRef = this.modalService.open(OpcionDeleteComponent, {centered:true, size: 'md'})
    modalRef.componentInstance.opcion_selected = OPCION;

    modalRef.componentInstance.OpcionD.subscribe((resp:any) => {
      let INDEX = this.OPCIONES.findIndex((item:any) => item.id == OPCION.id)
      this.OPCIONES.splice(INDEX,1);
    });
    
  }

  processAudio($event: any) {
    const file = $event.target.files[0];
    if (file && file.type.indexOf("audio") < 0) {
      this.toaster.open({ text: 'SOLAMENTE SE ACEPTAN ARCHIVOS DE AUDIO', caption: 'MENSAJE DE VALIDACIÓN', type: 'danger' });
      return;
    }
    this.AUDIO = file;
    console.log(this.AUDIO);
  }

  processArmonias($event:any){
    const file = $event.target.files[0];
    this.ARMONIAS = file;
    console.log(this.ARMONIAS);
  }

  processCuerdas($event:any){
    const file = $event.target.files[0];
    this.CUERDAS = file;
    console.log(this.CUERDAS);
  }

  processMetales($event:any){
    const file = $event.target.files[0];
    this.METALES = file;
    console.log(this.METALES);
  }

  processBajo($event:any){
    const file = $event.target.files[0];
    this.BAJO = file;
    console.log(this.BAJO);
  }

}
