import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAdminComponent } from './user-admin/user-admin.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'list',
      component: UserListComponent
    },
    {
      path: 'admin',
      component: UserAdminComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
