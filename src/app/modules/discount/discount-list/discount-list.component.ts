import { Component, OnInit } from '@angular/core';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  DISCOUNTS:any = [];
  type_campaign: number = 0;
  search:any = null;
  state:any = 0;
  isLoading:any;
  constructor(public discountService:DiscountService, public modalService:NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.listDiscounts();
  }

  listDiscounts(){
    this.discountService.listDiscounts(this.search,this.state).subscribe((resp:any) => {
      console.log(resp);
      this.DISCOUNTS = resp.discounts.data;
    });
  }

  deleteDiscount(DISCOUNT:any){
    const modalRef = this.modalService.open(DiscountDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.discount = DISCOUNT;

    modalRef.componentInstance.DiscountD.subscribe(() => {
      let INDEX = this.DISCOUNTS.findIndex((item: any) => item.id == DISCOUNT.id);
      if (INDEX !== -1) {
        this.DISCOUNTS.splice(INDEX, 1);
      }
    });
  }

}
