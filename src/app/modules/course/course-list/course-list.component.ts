import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  
  COURSES:any = [];
  isLoading:any;
  search:any = null;
  state:any = null;
  constructor(public courseService: CourseService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
    this.listCourses();
  }

  listCourses(){
    this.courseService.listCourses(this.search, this.state).subscribe((resp:any) => {
      console.log(resp);
      this.COURSES = resp.courses.data;
    })
  }

  deleteCourse(COURSE: any): void {
    const modalRef = this.modalService.open(CourseDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.course = COURSE;

    modalRef.componentInstance.CourseD.subscribe(() => {
      let INDEX = this.COURSES.findIndex((item: any) => item.id == COURSE.id);
      if (INDEX !== -1) {
        this.COURSES.splice(INDEX, 1);
      }
    });
  }

}
