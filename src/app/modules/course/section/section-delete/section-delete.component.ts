import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss']
})
export class SectionDeleteComponent implements OnInit {

  @Input() section_selected:any;

  @Output() SectionD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(public courseService: CourseService, public toaster: Toaster,
    public modal: NgbActiveModal) {
      this.isLoading = this.courseService.isLoading$;
    }

  ngOnInit(): void {
  }

  delete(){
    this.courseService.deleteSection(this.section_selected.id).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACIÓN', type: 'danger'})
        return;
      } else{
        this.SectionD.emit("");
        this.modal.dismiss();
      }
    })
  }

}
