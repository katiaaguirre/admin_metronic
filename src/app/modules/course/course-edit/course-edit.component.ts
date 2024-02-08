import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  subcategories:any = [];
  subcategories_back:any = [];
  categories:any = [];
  instructores:any = [];
  isLoading:any;
  file_portada:any = null;
  image_preview:any = null;
  requirements:any = [];
  text_requirements:any = null;
  who_is_it_for:any = [];
  text_who_is_it_for:any = null;

  title:any = null;
  subtitle:any = null;
  precio_usd:any = null;
  precio_mxn:any = null;
  description:any = "<p>Hola mundo</p>";
  category_id:any = null;
  sub_category_id:any = null;
  user_id:any = null;
  level:any = null;
  idioma:any = null;
  state:any = 1;
  url_video:any = null;
  time:any = null;

  course_id:any;
  course_selected:any = null;
  trailer_curso:any = null;

  constructor(public courseService: CourseService, public toaster: Toaster,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.courseService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.subcategories = resp.subcategories;
      this.categories = resp.categories;
      this.instructores = resp.instructores;
      this.showCourse(this.course_id);
    })

    this.activatedRoute.params.subscribe((resp:any) => {
      this.course_id = resp.id;
      this.showCourse(this.course_id);
    });
  }

  showCourse(course_id:string){
    this.courseService.showCourse(course_id).subscribe((resp:any) => {
      console.log(resp);
      this.course_selected = resp.course;
      this.title = this.course_selected.title;
      this.subtitle = this.course_selected.subtitle;
      this.precio_usd = this.course_selected.precio_usd;
      this.precio_mxn = this.course_selected.precio_mxn;
      this.category_id = this.course_selected.category_id;
      this.selectCategory({target:{value:this.category_id}});
      this.sub_category_id = this.course_selected.sub_category_id;
      this.description = this.course_selected.description;
      this.level = this.course_selected.level;
      this.idioma = this.course_selected.idioma;
      this.user_id = this.course_selected.user_id;
      this.requirements = this.course_selected.requirements;
      this.who_is_it_for = this.course_selected.who_is_it_for;
      this.image_preview = this.course_selected.image;
      this.state = this.course_selected.state;
      this.url_video = this.course_selected.url_video;
    });
  }

  selectCategory(event:any){
    let value = event.target.value;
    console.log(value);
    this.subcategories_back = this.subcategories.filter((item:any) => item.category_id == value)
  }

  addRequirements(){
    if(!this.text_requirements){
      this.toaster.open({text: 'NECESITAS INGRESAR UN REQUERIMIENTO', caption: 'VALIDACIÓN', type: 'danger'});
      return;
    }
    this.requirements.push(this.text_requirements);
    this.text_requirements = null;
  }

  addWhoIsItFor(){
    if(!this.text_who_is_it_for){
      this.toaster.open({text: 'NECESITAS INGRESAR UNA PERSONA A QUIEN EL CURSO ESTÁ DIRIGIDO', caption: 'VALIDACIÓN', type: 'danger'});
      return;
    }
    this.who_is_it_for.push(this.text_who_is_it_for);
    this.text_who_is_it_for = null;
  }
 
  
  removeRequirement(index:number){
    this.requirements.splice(index,1);
  }

  removeWhoIsItFor(index:number){
    this.who_is_it_for.splice(index,1);
  }

  public onChange(event:any){
    this.description = event.editor.getData();
  }
  
  save(){
    if(!this.title ||
      !this.subtitle ||
      !this.precio_usd ||
      !this.precio_mxn ||
      !this.category_id ||
      !this.sub_category_id){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let formData = new FormData();
    formData.append("title", this.title);
    formData.append("subtitle", this.subtitle);
    formData.append("precio_usd", this.precio_usd);
    formData.append("precio_mxn", this.precio_mxn);
    formData.append("category_id", this.category_id);
    formData.append("sub_category_id", this.sub_category_id);
    formData.append("description", this.description);
    formData.append("url_video", this.url_video);
    formData.append("level", this.level);
    formData.append("idioma", this.idioma);
    formData.append("user_id", this.user_id);
    formData.append("state", this.state)
    formData.append("time", this.time)
    if(this.file_portada){
      formData.append("portada", this.file_portada);
    }
    formData.append("requirements", this.requirements);
    formData.append("who_is_it_for", this.who_is_it_for);

    this.courseService.updateCourses(formData, this.course_id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "EL CURSO HA SIDO MODIFICADO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        return;
      }
    });
  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open({text: 'SOLAMENTE SE ACEPTAN IMÁGENES', caption: 'MENSAJE DE VALIDACIÓN', type: 'danger'});
      return
    }
    this.file_portada = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_portada);
    reader.onloadend = () => this.image_preview = reader.result;
    this.courseService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.courseService.isLoadingSubject.next(false)
    }, 50);
  }
}
