import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from '../service/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:any = [];
  isLoading:any = null;

  search:any = null;
  state:any = null;

  constructor(public modalService: NgbModal, public userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
    
    this.listUser();
  }

  listUser(){
    this.userService.listUsers(this.search, this.state).subscribe((resp:any) => {
      console.log(resp);
      this.users = resp.users.data;
    });
  }

  openModalCreateUser(){
    const modalRef = this.modalService.open(UserAddComponent, {centered: true, size: 'md'});

    modalRef.componentInstance.UserC.subscribe((User:any) => {
      console.log(User);
      this.users.unshift(User);
    });
  }

  editUser(user:any){
    const modalRef = this.modalService.open(UserEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.user = user;

    modalRef.componentInstance.UserE.subscribe((User:any) => {
      console.log(User);
      let index = this.users.findIndex((item:any) => item.id == User.id);
      this.users[index] = User;
    });
  }

  deleteUser(user:any){
    const modalRef = this.modalService.open(UserDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.user = user;

    modalRef.componentInstance.UserD.subscribe((resp:any) => {
      let index = this.users.findIndex((item:any) => item.id == user.id);
      this.users.splice(index, 1);
    });
  }

}
