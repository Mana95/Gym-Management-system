import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-instructors-view',
  templateUrl: './instructors-view.component.html',
  styleUrls: ['./instructors-view.component.scss']
})
export class InstructorsViewComponent implements OnInit {
  instructorData:any;
  powers:any;
  pow:any;
  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.getAllSchedule()
    .subscribe(
      response=>{
        this.powers = response;
      }
    )
    this.loadTableData();
  }
  getChangeValue(event) {
   // console.log(event.target.value);
    let selectedValue = event.target.value;
    if(event.target.value != 'Instructor Type'){
      this.authenticationService.getReleventType(selectedValue)
      .subscribe(
        res=>{
          this.instructorData = res
        }
      )
    }
    else{
      this.authenticationService.responseAllInstructorData()
      .subscribe(
        response=>{
          this.instructorData = response
        }
      ) 
    }
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
