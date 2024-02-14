import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../../service/course.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { ClaseFileDeleteComponent } from '../clase-file-delete/clase-file-delete.component';

@Component({
  selector: 'app-clase-edit',
  templateUrl: './clase-edit.component.html',
  styleUrls: ['./clase-edit.component.scss']
})
export class ClaseEditComponent implements OnInit {
  @Input() clase_selected: any;
  @Output() ClaseE: EventEmitter<any> = new EventEmitter();
  title:any;
  description:any;
  url_video:any;
  time:any = null;
  isLoading:any;
  FILES:any = [];
  clase_files:any = [];
  isUploadFiles:Boolean = false;
  state:any = 1;
  constructor(public courseService:CourseService, public modal:NgbActiveModal,
    public toaster: Toaster, public sanitizer: DomSanitizer,
    public modalService:NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.title = this.clase_selected.name;
    this.description = this.clase_selected.description;
    this.url_video = this.clase_selected.url_video;
    this.time = this.clase_selected.time;
    this.clase_files = this.clase_selected.files;
    this.state = this.clase_selected.state;
  }
 
  save(){
    let data = {
      name: this.title,
      description: this.description,
      url_video: this.url_video,
      time: this.time,
      state: this.state
    }
    if(!this.description){
      this.toaster.open({text: "NO PUEDES DEJAR LA CLASE SIN DESCRIPCIÓN", caption: "VALIDACIÓN", type: "danger"});
      return;
    }
    this.courseService.updateClase(data, this.clase_selected.id).subscribe((resp:any) => {
      this.toaster.open({text: "SE HAN REGISTRADO LOS CAMBIOS DE LA CLASE", caption: "SUCCESS", type: "success"});
      this.modal.close();
      this.ClaseE.emit(resp.clase);
    });
  }

  uploadFiles(){
    if(this.FILES.length == 0){
      this.toaster.open({text: "NECESITAS SUBIR UN RECURSO A LA CLASE", caption: "VALIDACIÓN", type: "danger"});
      return;
    }
    let formData = new FormData();
    formData.append("course_clase_id",this.clase_selected.id);
    this.FILES.forEach((file:any, index:number) => {
      formData.append("files["+index+"]",file);
    });
    this.isUploadFiles = true;
    this.courseService.registerClaseFile(formData).subscribe((resp:any) => {
      this.isUploadFiles = false;
      console.log(resp);
      this.modal.close();
      this.ClaseE.emit(resp.clase)
    })
  }

  public onChange(event:any){
    this.description = event.editor.getData();
  }

  processFile($event:any){
    for(const file of $event.target.files){
      this.FILES.push(file);
    }
    console.log(this.FILES)
  }

  deleteFile(FILE:any){
    const modalRef = this.modalService.open(ClaseFileDeleteComponent, {centered:true, size: 'sm'})
    modalRef.componentInstance.file_selected = FILE;

    modalRef.componentInstance.FileD.subscribe((resp:any) => {
      let INDEX = this.clase_files.findIndex((item:any) => item.id == FILE.id)
      this.clase_files.splice(INDEX,1);
    });
  }
}
