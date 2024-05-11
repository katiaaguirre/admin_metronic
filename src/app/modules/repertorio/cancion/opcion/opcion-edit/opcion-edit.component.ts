import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepertorioService } from '../../../service/repertorio.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { OpcionFileDeleteComponent } from '../opcion-file-delete/opcion-file-delete.component';

@Component({
  selector: 'app-opcion-edit',
  templateUrl: './opcion-edit.component.html',
  styleUrls: ['./opcion-edit.component.scss']
})
export class OpcionEditComponent implements OnInit {

  @Input() opcion_selected: any;
  @Output() OpcionE: EventEmitter<any> = new EventEmitter();
  tonalidad:any;
  video:any = null;
  AUDIO:any = null;
  ARMONIAS:any = null;
  CUERDAS:any = null;
  METALES:any = null;
  BAJO:any = null;
  isLoading:any;

  BotonAudio:boolean = true;
  BotonArmonias:boolean = true;
  BotonCuerdas:boolean = true;
  BotonMetales:boolean = true;
  BotonBajo:boolean = true;

  files:any = [];
  isUploadFiles:Boolean = false;
  
  constructor(public repertorioService:RepertorioService, public modal:NgbActiveModal,
    public toaster: Toaster, public sanitizer: DomSanitizer,
    public modalService:NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.repertorioService.isLoading$;
    this.tonalidad = this.opcion_selected.tonalidad;
    this.video = this.opcion_selected.video;
    this.files = this.opcion_selected.files;
    this.AUDIO = this.opcion_selected.files.audio;
    this.ARMONIAS = this.opcion_selected.files.armonias;
    this.CUERDAS = this.opcion_selected.files.cuerdas;
    this.METALES = this.opcion_selected.files.metales;
    this.BAJO = this.opcion_selected.files.bajo;
  }
 
  save(){
    let data = {
      tonalidad: this.tonalidad,
      video: this.video
    }
    if(!this.tonalidad){
      this.toaster.open({text: "NO PUEDES DEJAR LA OPCIÓN SIN TÍTULO", caption: "VALIDACIÓN", type: "danger"});
      return;
    }
    this.repertorioService.updateOpcion(data, this.opcion_selected.id).subscribe((resp:any) => {
      this.toaster.open({text: "SE HAN REGISTRADO LOS CAMBIOS DE LA OPCIÓN", caption: "SUCCESS", type: "success"});
      this.modal.close();
      this.OpcionE.emit(resp.opcion);
    });
  }

  uploadFiles(){
    let formData = new FormData();
    formData.append("opcion_id",this.opcion_selected.id);
    
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
    
    this.isUploadFiles = true;
    this.repertorioService.registerOpcionFile(formData).subscribe((resp:any) => {
      this.isUploadFiles = false;
      console.log(resp);
      this.modal.close();
      this.OpcionE.emit(resp.opcion);
      this.toaster.open({text: "LOS ARCHIVOS HAN SIDO ACTUALIZADOS EXITOSAMENTE", caption: "SUCCESS", type:"success"})
    })
  }

  processAudio($event: any) {
    const file = $event.target.files[0];
    if (file && file.type.indexOf("audio") < 0) {
      this.toaster.open({ text: 'SOLAMENTE SE ACEPTAN ARCHIVOS DE AUDIO', caption: 'MENSAJE DE VALIDACIÓN', type: 'danger' });
      return;
    }
    this.AUDIO = file;
    console.log(this.AUDIO);
    this.BotonAudio = false;
  }

  processArmonias($event:any){
    const file = $event.target.files[0];
    this.ARMONIAS = file;
    this.BotonArmonias = false;
  }

  processCuerdas($event:any){
    const file = $event.target.files[0];
    this.CUERDAS = file;
    this.BotonCuerdas = false;
  }

  processMetales($event:any){
    const file = $event.target.files[0];
    this.METALES = file;
    this.BotonMetales = false;
  }

  processBajo($event:any){
    const file = $event.target.files[0];
    this.BAJO = file;
    this.BotonBajo = false;
  }

  deleteFile(FILE:any){
    const modalRef = this.modalService.open(OpcionFileDeleteComponent, {centered:true, size: 'sm'})
    modalRef.componentInstance.file_selected = FILE;

    modalRef.componentInstance.FileD.subscribe((resp:any) => {
      console.log(resp);
      if(resp == "AUDIO"){
        this.AUDIO = null;
      }
      if(resp == "ARMONIAS"){
        this.ARMONIAS = null;
      }
      if(resp == "CUERDAS"){
        this.CUERDAS = null;
      }
      if(resp == "METALES"){
        this.METALES = null;
      }
      if(resp == "BAJO"){
        this.BAJO = null;
      }
    });
  }

}
