import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  usuario_repertorio:any;
  user_repertoire:any = null;
  rep_repertorio:any;
  rep_repertoire:any = null;
  instrumento_repertorio:any;

  usuario_curso:any;
  user_course:any = null;
  cur_curso:any;
  cour_course:any = null;

  rol:any;
  role_id:any = null;
  role_subtitle:any;

  usuario_mariachi_amigo:any;
  user_amigo:any = null;
  instrumento_amigo:any = null;

  isLoading:any;

  constructor(public userService:UserService, public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
  }

  userRep(value:any){
    this.user_repertoire = value;
  }
  repRep(value:any){
    this.rep_repertoire = value;
  }
  userCour(value:any){
    this.user_course = value;
  }
  CourCour(value:any){
    this.cour_course = value;
  }
  userAmigo(value:any){
    this.user_amigo = value;
  }

  AddToRepertorio(){
    if(!this.user_repertoire ||
      !this.rep_repertoire){
        this.toaster.open({text: "NECESITAS INDICAR QUÉ TIPO DE DATO ESTÁS INGRESANDO. EJ: EMAIL/ID", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    if(!this.usuario_repertorio ||
      !this.rep_repertorio){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    if(!this.instrumento_repertorio){
      this.toaster.open({text: "NECESITAS ESPECIFICAR DE QUÉ INSTRUMENTO SE LE MOSTRARÁ LA INFORMACIÓN DEL REPERTORIO AL USUARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let instrumentos = this.instrumento_repertorio.split(',').map(Number);

    let data = {
      usuario: this.usuario_repertorio,
      OpcionUsuario: this.user_repertoire,
      repertorio: this.rep_repertorio,
      OpcionRepertorio: this.rep_repertoire,
      instrumento: instrumentos
    }

    this.userService.InscribirRepertorio(data).subscribe((resp:any) => {
      console.log(resp)
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "SE HA INSCRITO AL ESTUDIANTE A EL REPERTORIO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        this.usuario_repertorio = '';
        this.user_repertoire = null;
        this.rep_repertorio = '';
        this.rep_repertoire = null;
        this.instrumento_repertorio = '';
        return;
      }
    })
  }

  RemoveFromRepertorio(){
    if(!this.user_repertoire ||
      !this.rep_repertoire){
        this.toaster.open({text: "NECESITAS INDICAR QUÉ TIPO DE DATO ESTÁS INGRESANDO. EJ: EMAIL/ID", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    if(!this.usuario_repertorio ||
      !this.rep_repertorio){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let data = {
      usuario: this.usuario_repertorio,
      OpcionUsuario: this.user_repertoire,
      repertorio: this.rep_repertorio,
      OpcionRepertorio: this.rep_repertoire
    }

    this.userService.RemoverDRepertorio(data).subscribe((resp:any) => {
      console.log(resp)
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "SE HA REVOCADO EL ACCESO DEL USUARIO AL REPERTORIO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        this.usuario_repertorio = '';
        this.user_repertoire = null;
        this.rep_repertorio = '';
        this.rep_repertoire = null;

        return;
      }
    })
  }

  AddToCurso(){
    if(!this.user_course ||
      !this.cour_course){
        this.toaster.open({text: "NECESITAS INDICAR QUÉ TIPO DE DATO ESTÁS INGRESANDO. EJ: EMAIL/ID", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    if(!this.usuario_curso ||
      !this.cur_curso){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let data = {
      usuario: this.usuario_curso,
      OpcionUsuario: this.user_course,
      curso: this.cur_curso,
      OpcionCurso: this.cour_course
    }

    this.userService.InscribirCurso(data).subscribe((resp:any) => {
      console.log(resp)
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "SE HA CONCEDIDO ACCESO Al CURSO A EL USUARIO", caption: 'SUCCESS', type: 'success'});
        this.usuario_curso = '';
        this.user_course = null;
        this.cur_curso = '';
        this.cour_course = null;

        return;
      }
    })
  }

  RemoveFromCurso(){
    if(!this.user_course ||
      !this.cour_course){
        this.toaster.open({text: "NECESITAS INDICAR QUÉ TIPO DE DATO ESTÁS INGRESANDO. EJ: EMAIL/ID", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    if(!this.usuario_curso ||
      !this.cur_curso){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let data = {
      usuario: this.usuario_curso,
      OpcionUsuario: this.user_course,
      curso: this.cur_curso,
      OpcionCurso: this.cour_course
    }

    this.userService.RemoverDCurso(data).subscribe((resp:any) => {
      console.log(resp)
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "SE HA REVOCADO EL ACCESO DEL USUARIO AL CURSO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        this.usuario_curso = '';
        this.user_course = null;
        this.cur_curso = '';
        this.cour_course = null;

        return;
      }
    })
  }

  CreateRole(){

    if(!this.rol ||
      !this.role_subtitle || !this.role_id){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let data = {
      id: this.role_id,
      name: this.rol,
      subtitle: this.role_subtitle
    }

    this.userService.CrearRol(data).subscribe((resp:any) => {
      console.log(resp)
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "SE HA CREADO EL ROL EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        this.role_id = '';
        this.rol = '';
        this.role_subtitle = '';

        return;
      }
    })
  }

  DeleteRole(){
    if(!this.rol || !this.role_id){
        this.toaster.open({text: "NECESITAS PROPORCIONAR EL ID O NOMBRE DEL ROL", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let data = {
      id: this.role_id,
      name: this.rol
    }

    this.userService.DeleteRol(data).subscribe((resp:any) => {
      console.log(resp)
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "SE HA ELIMINADO EL ROL", caption: 'SUCCESS', type: 'success'});
        this.role_id = '';
        this.rol = '';
        this.role_subtitle = '';

        return;
      }
    })
  }

  AddToMAmigo(){

  }
  
  RemoveFromMAmigo(){
    
  }

}
