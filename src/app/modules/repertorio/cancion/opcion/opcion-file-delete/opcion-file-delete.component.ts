import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepertorioService } from '../../../service/repertorio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-opcion-file-delete',
  templateUrl: './opcion-file-delete.component.html',
  styleUrls: ['./opcion-file-delete.component.scss']
})
export class OpcionFileDeleteComponent implements OnInit {
  
  @Input() file_selected:any;

  @Output() FileD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public repertorioService: RepertorioService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.repertorioService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.repertorioService.deleteOpcionFile(this.file_selected.id).subscribe((resp:any) => {
      if(this.file_selected.tipo == 0){
        this.FileD.emit("AUDIO");
      }
      if(this.file_selected.tipo == 1){
        this.FileD.emit("ARMONIAS");
      }
      if(this.file_selected.tipo == 2){
        this.FileD.emit("CUERDAS");
      }
      if(this.file_selected.tipo == 3){
        this.FileD.emit("METALES");
      }
      if(this.file_selected.tipo == 4){
        this.FileD.emit("BAJO");
      }
      this.modal.dismiss();
      this.toaster.open({text: "EL ARCHIVO HA SIDO ELIMINADO", caption: "SUCCESS", type: "success"});
    })
  }
}
