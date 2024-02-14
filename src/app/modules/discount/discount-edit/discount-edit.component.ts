import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss']
})
export class DiscountEditComponent implements OnInit {

  discount:number = 0;
  type_discount:number = 1;
  discount_type:number = 1;
  start_date:any = null;
  end_date:any = null;
  type_campaign:number = 1; //1 es campaña normal, 2 es flash y 3 es banner
  state:any = 1;

  course_id:any = null;
  category_id:any = null;
  isLoading:any;

  courses:any = [];
  categories:any = [];
  category_selected:any = [];
  course_selected:any = [];
  discount_selected:any;
  discount_id:any;
  constructor(public discountService:DiscountService, public toaster:Toaster,
    public activedRouter:ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.activedRouter.params.subscribe((resp:any) => {
      this.discount_id = resp.id;
    })
    this.discountService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.courses = resp.courses;
      this.categories = resp.categories;

      this.showDiscount();
    })
  }

  showDiscount(){
    this.discountService.showDiscount(this.discount_id).subscribe((resp:any) => {
      console.log(resp);
      this.discount_selected = resp.discount;

      this.discount = this.discount_selected.discount;
      this.type_discount = this.discount_selected.type_discount;
      this.type_campaign = this.discount_selected.type_campaign;
      this.discount_type = this.discount_selected.discount_type;
      this.start_date = this.discount_selected.start_date;
      this.end_date = this.discount_selected.end_date;
      this.state = this.discount_selected.state;
      
      if(this.discount_type == 1){
        this.course_selected = this.discount_selected.courses;
      }
      if(this.discount_type == 2){
        this.category_selected = this.discount_selected.categories;
      }
    });
  }
  
  save(){
    if(!this.discount || !this.start_date || !this.end_date)
    if(this.discount_type == 1 && this.course_selected.length == 0){
      this.toaster.open({text: "NECESITAS SELECCIONAR CURSOS", caption: "VALIDACIÓN", type: "danger"})
      return;
    }
    if(this.discount_type == 2 && this.category_selected.length == 0){
      this.toaster.open({text: "NECESITAS SELECCIONAR CATEGORÍAS", caption: "VALIDACIÓN", type: "danger"})
      return;
    }
    let data = {
      discount: this.discount,
      type_discount: this.type_discount,
      type_campaign: this.type_campaign,
      discount_type: this.discount_type,
      start_date: this.start_date,
      end_date: this.end_date,
      course_selected: this.course_selected,
      category_selected: this.category_selected,
      state: this.state
    }
    console.log(data);
    this.discountService.updateDiscount(data,this.discount_id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: "VALIDACIÓN", type: "danger"})
        return;
      }else{
        this.toaster.open({text: "LA CAMPAÑA DE DESCUENTO HA SIDO ACTUALIZADA CORRECTAMENTE", caption: "VALIDACIÓN", type: "success"});
      }
    });
  }

  addCourseSelected(){
    let VALID = this.course_selected.findIndex((course:any) => course.id == this.course_id);
    if(VALID == -1){
      let INDEX = this.courses.findIndex((course:any) => course.id == this.course_id);
      if(INDEX !== -1){
        this.course_selected.push(this.courses[INDEX]);
        this.course_id = null;
      }
    }
  }
  
  addCategorySelected(){
    let VALID = this.category_selected.findIndex((category:any) => category.id == this.category_id);
    if(VALID == -1){
      let INDEX = this.categories.findIndex((category:any) => category.id == this.category_id);
      if(INDEX !== -1){
        this.category_selected.push(this.categories[INDEX]);
        this.category_id = null;
      }
    }
    
  }

  removeCourse(i:number){
    this.course_selected.splice(i,1);
  }

  removeCategory(i:number){
    this.category_selected.splice(i,1);
  }

  selectedTypeDiscount(value:any){
    this.type_discount = value;
  }

  selectedTypeCampaign(value:any){
    this.selectedTypeCoupon(1);
    this.type_campaign = value;
  }

  selectedTypeCoupon(value:any){
    this.discount_type = value;
    this.course_selected = [];
    this.category_selected = [];
  }

}
