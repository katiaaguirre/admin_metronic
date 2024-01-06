import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  @Output() CategoryC: EventEmitter<any> = new EventEmitter();
  @Input() CATEGORIES:any = null;
  name:any = null;

  image_preview:any = "./assets/media/illustrations/sigma-1/5.png";
  file_portada:any = null;

  isLoading:any;
  selected_option:any = 1;
  category_id:any = null;
  constructor(public categoryService: CategoryService, public toaster:Toaster,
    public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.isLoading = this.categoryService.isLoading$;
  }
  
  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open({text: 'SOLAMENTE SE ACEPTAN IMÁGENES', caption: 'MENSAJE DE VALIDACIÓN', type: 'danger'});
      return
    }
    this.file_portada = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_portada);
    reader.onloadend = () => this.image_preview = reader.result;
  }

  store(){
    if(this.selected_option == 1){
      if(!this.name || !this.file_portada){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS", caption: 'VALIDACIÓN', type: "danger"});
        return;
      }
    }

    if(this.selected_option == 2){
      if(!this.name || !this.category_id){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS", caption: 'VALIDACIÓN', type: "danger"});
        return;
      }
    }

    let formData = new FormData();

    formData.append("name", this.name);
    if(this.category_id){
      formData.append("category_id", this.category_id);
    }
    if(this.file_portada){
      formData.append("portada", this.file_portada);
    }

    this.categoryService.registerCategory(formData).subscribe((resp:any) => {
      console.log(resp);
      this.CategoryC.emit(resp.category);
      this.toaster.open({text: "LA CATEGORÍA SE REGISTRÓ CORRECTAMENTE", caption: "INFORME", type: 'primary'});
      this.modal.close();
    });
  }

  selectedOption(value:number){
    this.selected_option = value;
  }
}
