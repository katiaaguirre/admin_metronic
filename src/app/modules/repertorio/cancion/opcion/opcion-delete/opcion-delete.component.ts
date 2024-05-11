import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepertorioService } from '../../../service/repertorio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-opcion-delete',
  templateUrl: './opcion-delete.component.html',
  styleUrls: ['./opcion-delete.component.scss']
})
export class OpcionDeleteComponent implements OnInit {
  @Input() opcion_selected:any;

  @Output() OpcionD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public repertorioService: RepertorioService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.repertorioService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.repertorioService.deleteOpcion(this.opcion_selected.id).subscribe((resp:any) => {
      this.OpcionD.emit("");
      this.modal.dismiss();
      this.toaster.open({ text: 'LA OPCIÓN HA SIDO ELIMINADA CORRECTAMENTE', caption: 'SUCCESS', type: 'success' });
    })
  }
}
