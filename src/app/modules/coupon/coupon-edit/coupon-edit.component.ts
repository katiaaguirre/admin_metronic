import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss']
})
export class CouponEditComponent implements OnInit {
  code:any;
  discount:number = 0;
  num_use:any = null;
  type_discount:number = 1;
  type_count:number = 1;
  type_coupon:number = 1;
  state:number = 1;
  
  course_id:any = null;
  category_id:any = null;
  isLoading:any;

  courses:any = [];
  categories:any = [];
  category_selected:any = [];
  course_selected:any = [];
  coupon_selected:any;

  coupon_id:any;
  constructor(public couponService:CouponService, public toaster:Toaster, public activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.coupon_id = resp.id;
    })
    this.couponService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.courses = resp.courses;
      this.categories = resp.categories;

      this.showCoupon();
    })
  }

  showCoupon(){
    this.couponService.showCoupon(this.coupon_id).subscribe((resp:any) => {
      console.log(resp);
      this.coupon_selected = resp.coupon;
      this.code = this.coupon_selected.code;
      this.discount = this.coupon_selected.discount;
      this.num_use = this.coupon_selected.num_use;
      this.type_discount = this.coupon_selected.type_discount;
      this.type_count = this.coupon_selected.type_count;
      this.type_coupon = this.coupon_selected.type_coupon;
      this.state = this.coupon_selected.state;
      
      if(this.type_coupon == 1){
        this.course_selected = this.coupon_selected.courses;
      }
      if(this.type_coupon == 2){
        this.category_selected = this.coupon_selected.categories;
      }
    });
  }

  save(){
    
    if(this.type_count == 2 && !this.num_use){
      this.toaster.open({text: "NECESITAS INGRESAR UN NÚMERO DE USOS LIMITADOS", caption: "VALIDACIÓN", type: "danger"})
      return;
    }
    if(this.type_coupon == 1 && this.course_selected.length == 0){
      this.toaster.open({text: "NECESITAS SELECCIONAR CURSOS", caption: "VALIDACIÓN", type: "danger"})
      return;
    }
    if(this.type_coupon == 2 && this.category_selected.length == 0){
      this.toaster.open({text: "NECESITAS SELECCIONAR CATEGORÍAS", caption: "VALIDACIÓN", type: "danger"})
      return;
    }
    let data = {
      code: this.code,
      discount: this.discount,
      type_discount: this.type_discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_coupon: this.type_coupon,
      course_selected: this.course_selected,
      category_selected: this.category_selected,
      state: this.state
    }
    console.log(data);
    this.couponService.updateCoupon(data, this.coupon_id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: "VALIDACIÓN", type: "danger"})
        return;
      }else{
        this.toaster.open({text: "EL CUPÓN HA SIDO ACTUALIZADO CORRECTAMENTE", caption: "VALIDACIÓN", type: "success"});
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

  selectedTypeCount(value:any){
    this.type_count = value;
  }

  selectedTypeCoupon(value:any){
    this.type_coupon = value;
  }


}
