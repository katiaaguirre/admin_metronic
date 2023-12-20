import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../service/category.service';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  CATEGORIES: any = [];
  isLoading: any = null;

  search: any = null;
  state: any = null;

  constructor(
    public modalService: NgbModal,
    public categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categoryService.isLoading$;
    this.listCategory();
  }
  
  listCategory(): void {
    this.categoryService.listCategories(this.search, this.state).subscribe((resp: any) => {
      console.log(resp);
      this.CATEGORIES = resp.categories.data;
    });
  }

  openModalCreateCategory(): void {
    const modalRef = this.modalService.open(CategoryAddComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category: any) => !category.category_id);

    modalRef.componentInstance.CategoryC.subscribe((Category: any) => {
      console.log(Category);
      this.CATEGORIES.unshift(Category);
    });
  }

  editCategory(category: any): void {
    const modalRef = this.modalService.open(CategoryEditComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category: any) => !category.category_id);

    modalRef.componentInstance.CategoryE.subscribe((Category: any) => {
      console.log(Category);
      let INDEX = this.CATEGORIES.findIndex((item: any) => item.id == Category.id);
      if (INDEX !== -1) {
        this.CATEGORIES[INDEX] = Category;
      }
    });
  }

  deleteCategory(category: any): void {
    const modalRef = this.modalService.open(CategoryDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.category = category;

    modalRef.componentInstance.CategoryD.subscribe(() => {
      let INDEX = this.CATEGORIES.findIndex((item: any) => item.id == category.id);
      if (INDEX !== -1) {
        this.CATEGORIES.splice(INDEX, 1);
      }
    });
  }
}
