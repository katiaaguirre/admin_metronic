import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepertorioService } from '../service/repertorio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-repertorio-delete',
  templateUrl: './repertorio-delete.component.html',
  styleUrls: ['./repertorio-delete.component.scss']
})
export class RepertorioDeleteComponent implements OnInit {
  @Input() repertorio:any;

  @Output() RepertorioD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public repertorioService: RepertorioService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.repertorioService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.repertorioService.deleteRepertorio(this.repertorio.id).subscribe((resp:any) => {
      this.RepertorioD.emit("");
      this.modal.dismiss();
    })
  }

}
