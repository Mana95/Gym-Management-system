import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-instructors-view',
  templateUrl: './instructors-view.component.html',
  styleUrls: ['./instructors-view.component.scss']
})
export class InstructorsViewComponent implements OnInit {
  instructorData:any;
  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
    this.loadTableData();
  }
  loadTableData(){
    this.authenticationService.responseAllInstructorData()
    .subscribe(
      response=>{
        this.instructorData = response
      }
    )
  }

}
