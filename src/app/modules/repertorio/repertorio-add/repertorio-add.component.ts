import { Component, OnInit } from '@angular/core';
import { RepertorioService } from '../service/repertorio.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-repertorio-add',
  templateUrl: './repertorio-add.component.html',
  styleUrls: ['./repertorio-add.component.scss']
})
export class RepertorioAddComponent implements OnInit {

  name:any = null;
  subtitle:any = null;
  description:any = "<p>Este repertorio es</p>";
  
  isLoading:any;

  constructor(public repertorioService: RepertorioService, public toaster: Toaster) { }

  ngOnInit(): void {
    this.isLoading = this.repertorioService.isLoading$;
  }
 
  public onChange(event:any){
    this.description = event.editor.getData();
  }
  
  save(){
    console.log(this.description);

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

    this.repertorioService.registerRepertorio(formData).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'});
        return;
      } else{
        this.toaster.open({text: "EL REPERTORIO HA SIDO CREADO EXITOSAMENTE", caption: 'SUCCESS', type: 'success'});
        this.name = '';
        this.subtitle = '';
        this.description = null;
        return;
      }
    });
  }

}
