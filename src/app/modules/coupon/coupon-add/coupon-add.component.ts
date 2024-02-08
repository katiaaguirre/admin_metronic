import { Component, OnInit } from '@angular/core';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {
  code:any;
  discount:number = 0;
  num_use:number = 0;
  type_discount:number = 0;
  type_count:number = 0;
  type_coupon:number = 1;
  
  course_id:any = null;
  category_id:any = null;
  isLoading:any;

  courses:any = [];
  categories:any = [];
  category_selected:any = [];
  course_selected:any = [];
  constructor(public couponService:CouponService) {}

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
    this.couponService.listConfig().subscribe((resp:any) => {
      console.log(resp);
      this.courses = resp.courses;
      this.categories = resp.categories;
    })
  }

  save(){

  }

  addCourseSelected(){
    let INDEX = this.courses.findIndex((course:any) => course.id == this.course_id)
    if(INDEX != 1){
      this.course_selected.push(this.courses[INDEX]);
      this.course_id = null;
    }
  }
  
  addCategorySelected(){
    let INDEX = this.categories.findIndex((category:any) => category.id == this.category_id)
    if(INDEX != 1){
      this.category_selected.push(this.categories[INDEX]);
      this.category_id = null;
    }
  }

  removeCourse(){
    
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
