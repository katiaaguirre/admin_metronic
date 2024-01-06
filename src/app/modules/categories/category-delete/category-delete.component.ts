import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {
  @Input() category:any;

  @Output() CategoryD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public categoryService: CategoryService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.categoryService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.categoryService.deleteCategory(this.category.id).subscribe((resp:any) => {
      this.CategoryD.emit("");
      this.modal.dismiss();
    })
  }

}
