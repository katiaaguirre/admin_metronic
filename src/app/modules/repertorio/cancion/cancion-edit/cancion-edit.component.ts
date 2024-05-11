import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepertorioService } from '../../service/repertorio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-cancion-edit',
  templateUrl: './cancion-edit.component.html',
  styleUrls: ['./cancion-edit.component.scss']
})
export class CancionEditComponent implements OnInit {

  @Input() cancion_selected:any;
  @Output() CancionE: EventEmitter<any> = new EventEmitter();

  name:any;
  state:any = 1;
  isLoading:any;
  constructor(public modal: NgbActiveModal, public repertorioService:RepertorioService, public toaster:Toaster) { }

  ngOnInit(): void {
    this.isLoading = this.repertorioService.isLoading$;
    this.name = this.cancion_selected.name;
    this.state = this.cancion_selected.state;
    console.log(this.cancion_selected)
  }
  store(){
    let data = {
      name: this.name,
      state: this.state
    }
    this.repertorioService.updateCancion(data,this.cancion_selected.id).subscribe((resp:any) => {
      console.log(resp);
      this.CancionE.emit(resp.cancion)
      this.modal.close();
      this.toaster.open({ text: 'LA CANCIÓN HA SIDO ACTUALIZADA CORRECTAMENTE', caption: 'SUCESS', type: 'success' });
    });
  }
}
