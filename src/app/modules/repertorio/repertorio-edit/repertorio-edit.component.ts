import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { RepertorioService } from '../service/repertorio.service';

@Component({
  selector: 'app-repertorio-edit',
  templateUrl: './repertorio-edit.component.html',
  styleUrls: ['./repertorio-edit.component.scss']
})
export class RepertorioEditComponent implements OnInit {
  isLoading:any;

  name:any = null;
  subtitle:any = null;
  description:any = "<p>Hola mundo</p>";
  state:any = 1;

  repertorio_id:any;
  repertorio_selected:any = null;
  trailer_curso:any = null;

  constructor(public repertorioService: RepertorioService, public toaster: Toaster,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = this.repertorioService.isLoading$;

    this.activatedRoute.params.subscribe((resp:any) => {
      this.repertorio_id = resp.id;
      this.showRepertorio(this.repertorio_id);
    });
  }

  showRepertorio(repertorio_id:string){
      this.repertorioService.showRepertorio(repertorio_id).subscribe((resp:any) => {
        console.log(resp);
        this.repertorio_selected = resp.repertorio;
        this.name = this.repertorio_selected.name;
        this.subtitle = this.repertorio_selected.subtitle;
        this.description = this.repertorio_selected.description;
        this.state = this.repertorio_selected.state;
      });
    }

  public onChange(event:any){
    this.description = event.editor.getData();
  }

  save(){
    if(!this.name ||
      !this.subtitle ||
      !this.description){
        this.toaster.open({text: "NECESITAS LLENAR TODOS LOS CAMPOS DEL FORMULARIO", caption: 'VALIDACIÓN', type: 'danger'});
        return;
    }

    let formData = new FormData();
    formData.append("name", this.name);
    formData.append("subtitle", this.subtitle);
    formData.append("description", this.description);
    formData.append("state", this.state);

    this.repertorioService.updateRepertorio(formData, this.repertorio_id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "EL REPERTORIO HA SIDO MODIFICADO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        return;
      }
    });
  }

}
