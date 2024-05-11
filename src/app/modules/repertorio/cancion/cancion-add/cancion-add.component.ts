import { Component, OnInit } from '@angular/core';
import { RepertorioService } from '../../service/repertorio.service';
import { CancionEditComponent } from '../cancion-edit/cancion-edit.component';
import { CancionDeleteComponent } from '../cancion-delete/cancion-delete.component';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-cancion-add',
  templateUrl: './cancion-add.component.html',
  styleUrls: ['./cancion-add.component.scss']
})
export class CancionAddComponent implements OnInit {
  repertorio_id:any;
  isLoading:any;
  name:any;
  CANCIONES:any = [];
  count_canciones:number = 0;
  constructor(public repertorioServicio:RepertorioService,
    public activatedroute:ActivatedRoute, public toaster: Toaster,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.repertorioServicio.isLoading$;
    this.activatedroute.params.subscribe((resp) => {
      console.log(resp);
      this.repertorio_id = resp.id;
    });

    this.repertorioServicio.listCanciones(this.repertorio_id).subscribe((resp:any) => {
      console.log(resp);
      this.CANCIONES = resp.canciones;
      this.count_canciones = resp.count_canciones;
    });
  }

  editCancion(CANCION:any){
    const modalref = this.modalService.open(CancionEditComponent, {centered:true, size: 'md'});
    modalref.componentInstance.cancion_selected = CANCION;

    modalref.componentInstance.CancionE.subscribe((newCancion:any) => {
      let INDEX = this.CANCIONES.findIndex(((item:any) => item.id == newCancion.id));
      if(INDEX != -1){
        this.CANCIONES[INDEX] = newCancion;
      }
    })
    
  }

  deleteCancion(CANCION:any){
    const modalref = this.modalService.open(CancionDeleteComponent, {centered:true, size: 'md'});
    modalref.componentInstance.cancion_selected = CANCION;

    modalref.componentInstance.CancionD.subscribe((newCancion:any) => {
      let INDEX = this.CANCIONES.findIndex(((item:any) => item.id == CANCION.id));
      if(INDEX != -1){
        this.CANCIONES.splice(INDEX,1);
      }
    })
  }

  save(){
    if(!this.name){
      this.toaster.open({text: "NECESITAS INGRESAR UN NOMBRE PARA LA CANCIÓN", caption: "VALIDACIÓN", type: 'danger'});
      return;
    }
    let data = {
      name: this.name,
      repertorio_id: this.repertorio_id,
      state: 2
    }
    this.repertorioServicio.registerCancion(data).subscribe((resp:any) => {
      console.log(resp);
      this.name = null;
      this.CANCIONES.push(resp.cancion)
      this.toaster.open({text: "LA CANCIÓN SE REGISTRÓ CORRECTAMENTE", caption: "SUCCESS", type: 'success'});
    });
  }
}
