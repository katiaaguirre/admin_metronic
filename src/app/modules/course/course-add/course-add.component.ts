import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
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

  constructor(public courseService: CourseService, public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.courseService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.subcategories = resp.subcategories;
      this.categories = resp.categories;
      this.instructores = resp.instructores;
    })
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
  
  selectCategorie(event:any){
    let VALUE = event.target.value;
    console.log(VALUE);
    this.subcategories_back = this.subcategories.filter((item:any) => item.categorie_id == VALUE);
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
    console.log(this.description);

    if(!this.title ||
      !this.subtitle ||
      !this.precio_usd ||
      !this.precio_mxn ||
      !this.category_id ||
      !this.sub_category_id ||
      !this.description ||
      !this.level ||
      !this.idioma ||
      !this.user_id ||
      !this.file_portada ||
      !this.requirements ||
      !this.who_is_it_for){
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
    formData.append("level", this.level);
    formData.append("idioma", this.idioma);
    formData.append("user_id", this.user_id);
    formData.append("portada", this.file_portada);
    formData.append("requirements", this.requirements);
    formData.append("who_is_it_for", this.who_is_it_for);

    this.courseService.registerCourses(formData).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "EL CURSO HA SIDO CREADO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        this.title = '';
        this.subtitle = '';
        this.precio_usd = 0;
        this.precio_mxn = 0;
        this.category_id = null;
        this.sub_category_id = null;
        this.description = null;
        this.level = null;
        this.idioma = null;
        this.user_id = null;
        this.file_portada = null;
        this.requirements = [];
        this.who_is_it_for = [];
        this.image_preview = null;
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
