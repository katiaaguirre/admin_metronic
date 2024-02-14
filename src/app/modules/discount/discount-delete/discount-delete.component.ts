import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent implements OnInit {
  @Input() discount:any;

  @Output() DiscountD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public discountService: DiscountService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.discountService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.discountService.deleteDiscount(this.discount.id).subscribe((resp:any) => {
      this.DiscountD.emit("");
      this.modal.dismiss();
    })
  }

}
