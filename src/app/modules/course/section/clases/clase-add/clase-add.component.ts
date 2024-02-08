import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaseEditComponent } from '../clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from '../clase-delete/clase-delete.component';

@Component({
  selector: 'app-clase-add',
  templateUrl: './clase-add.component.html',
  styleUrls: ['./clase-add.component.scss']
})
export class ClaseAddComponent implements OnInit {
  CLASES:any = [];
  isLoading:any;

  title:any;
  url_video:any;
  time:any = null;
  description:any = "<p>Hola mundo</p>";
  FILES:any = [];
  section_id:any;
  constructor(public courseService:CourseService,
    public activatedRoute:ActivatedRoute, public toaster:Toaster,
    public modalService:NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.section_id = resp.id
    })
    this.isLoading = this.courseService.isLoading$;
    this.courseService.listClases(this.section_id).subscribe((resp:any) => {
      console.log(resp)
      this.CLASES = resp.clases.data;
    });
  }

  save(){
    if(!this.title){
    this.toaster.open({text: 'NECESITAS INGRESAR UN TITULO PARA LA CLASE', caption: 'VALIDACIÓN', type: 'danger'});
      return;
    } 
    if(!this.description){
      this.toaster.open({text: 'NECESITAS INGRESAR UNA DESCRIPCIÓN PARA LA CLASE', caption: 'VALIDACIÓN', type: 'danger'});
        return;
    } 
    let formData = new FormData();
    formData.append("name",this.title);
    formData.append("description",this.description);
    formData.append("url_video",this.url_video);
    formData.append("time",this.time);
    formData.append("course_section_id",this.section_id);

    this.FILES.forEach((file:any, index:number) => {
      formData.append("files["+index+"]", file);
    });

    this.courseService.registerClase(formData).subscribe((resp:any) => {
      console.log(resp)
      this.toaster.open({text: 'LA CLASE HA SIDO REGISTRADA CORRECTAMENTE', caption: 'SUCCESS', type: 'success'})
      this.CLASES.push(resp.clase);
      this.title = null;
      this.url_video = null;
      this.time = null;
      this.description = null;
      this.FILES = [];
    });
  }

  public onChange(event:any){
    this.description = event.editor.getData();
  }

  editClases(CLASE:any){
    const modalRef = this.modalService.open(ClaseEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.clase_selected = CLASE;

    modalRef.componentInstance.ClaseE.subscribe((CLASE:any) => {
      let INDEX = this.CLASES.findIndex((item:any) => item.id == CLASE.id);
      this.CLASES[INDEX] = CLASE;
    })
  }

  deleteClases(CLASE:any){
    const modalRef = this.modalService.open(ClaseDeleteComponent, {centered:true, size: 'sm'})
    modalRef.componentInstance.clase_selected = CLASE;

    modalRef.componentInstance.ClaseD.subscribe((resp:any) => {
      let INDEX = this.CLASES.findIndex((item:any) => item.id == CLASE.id)
      this.CLASES.splice(INDEX,1);
    });
  }

  processFile($event:any){
    for(const file of $event.target.files){
      this.FILES.push(file);
    }
    console.log(this.FILES)
  }
  
}
