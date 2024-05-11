import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepertorioService } from '../../service/repertorio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-cancion-delete',
  templateUrl: './cancion-delete.component.html',
  styleUrls: ['./cancion-delete.component.scss']
})
export class CancionDeleteComponent implements OnInit {

  @Input() cancion_selected:any;

  @Output() CancionD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public repertorioService: RepertorioService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.repertorioService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.repertorioService.deleteCancion(this.cancion_selected.id).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'})
        return;
      } else{
        this.CancionD.emit("");
        this.modal.dismiss();
      }
      
    })
  }
}
