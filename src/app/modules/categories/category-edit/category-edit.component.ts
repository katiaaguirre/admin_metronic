import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  @Output() CategoryE: EventEmitter<any> = new EventEmitter();
  @Input() CATEGORIES:any = null;
  @Input() category:any = null;

  name:any = null;
  
  image_preview:any = "./assets/media/illustrations/sigma-1/5.png";
  file_portada:any = null;

  isLoading:any;
  selected_option:any = 1;
  category_id: any = null;
  state:any = 1;
  constructor(
    public categoryService: CategoryService,
    public toaster:Toaster,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categoryService.isLoading$;
    this.name = this.category.name;
    this.selected_option = this.category.category_id ? 2 : 1;
    this.image_preview = this.category.image ? this.category.image : "./assets/media/avatars/300-6.jpg";
    this.category_id = this.category.category_id;
    this.state = this.category.state;
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
      if(!this.name){
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
      formData.append("category_id",this.category_id);
    }
    if(this.file_portada){
      formData.append("portada", this.file_portada);
    }
    formData.append("state", this.state);
    this.categoryService.updateCategory(formData,this.category.id).subscribe((resp:any) => {
      console.log(resp);
      this.CategoryE.emit(resp.category);
      this.toaster.open({text: "LA CATEGORIA SE ACTULIZÓ CORRECTAMENTE", caption: "INFORME", type: 'primary'});
      this.modal.close();
    });
  }

  selectedOption(value:number){
    this.selected_option = value;
  }
}
