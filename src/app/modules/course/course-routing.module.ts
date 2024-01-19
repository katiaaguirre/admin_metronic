import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [{
  path: '',
  component: CourseComponent,
  children: [
    {
      path: 'registro',
      component: CourseAddComponent
    },
    {
      path: 'eliminar',
      component: CourseDeleteComponent
    },
    {
      path: 'list',
      component: CourseListComponent
    },
    {
      path: 'list/editar/:id',
      component: CourseEditComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
