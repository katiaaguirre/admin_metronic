import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent implements OnInit {
  discount:number = 0;
  type_discount:number = 1;
  discount_type:number = 1;
  start_date:any = null;
  end_date:any = null;
  type_campaign:number = 1; //1 es campaña normal, 2 es flash y 3 es banner

  course_id:any = null;
  category_id:any = null;
  isLoading:any;

  courses:any = [];
  categories:any = [];
  category_selected:any = [];
  course_selected:any = [];
  constructor(public discountService:DiscountService, public toaster:Toaster) {}

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.discountService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.courses = resp.courses;
      this.categories = resp.categories;
    })
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
      category_selected: this.category_selected
    }
    console.log(data);
    this.discountService.registerDiscount(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: "VALIDACIÓN", type: "danger"})
        return;
      }else{
        this.toaster.open({text: "LA CAMPAÑA DE DESCUENTO HA SIDO REGISTRADA CORRECTAMENTE", caption: "VALIDACIÓN", type: "success"});
        this.discount = 0;
        this.type_discount = 1;
        this.type_campaign = 1;
        this.course_selected = [];
        this.category_selected = [];
        this.course_id = null;
        this.type_campaign = 1;
        this.start_date = null;
        this.end_date = null;
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
