import { Component, OnInit } from '@angular/core';
import { RepertorioService } from '../service/repertorio.service';
import { RepertorioDeleteComponent } from '../repertorio-delete/repertorio-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-repertorio-list',
  templateUrl: './repertorio-list.component.html',
  styleUrls: ['./repertorio-list.component.scss']
})
export class RepertorioListComponent implements OnInit {

  REPERTORIOS:any = [];
  isLoading:any;
  search:any = null;
  state:any = null;
  constructor(public repertorioService: RepertorioService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.repertorioService.isLoading$;
    this.listRepertorios();
  }

  listRepertorios(){
    this.repertorioService.listRepertorios(this.search, this.state).subscribe((resp:any) => {
      console.log(resp);
      this.REPERTORIOS = resp.repertorios.data;
    })
  }

  deleteRepertorio(REPERTORIO: any): void {
    const modalRef = this.modalService.open(RepertorioDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.repertorio = REPERTORIO;

    modalRef.componentInstance.RepertorioD.subscribe(() => {
      let INDEX = this.REPERTORIOS.findIndex((item: any) => item.id == REPERTORIO.id);
      if (INDEX !== -1) {
        this.REPERTORIOS.splice(INDEX, 1);
      }
    });
  }

}
