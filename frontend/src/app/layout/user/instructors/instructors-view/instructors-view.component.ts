import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructors-view',
  templateUrl: './instructors-view.component.html',
  styleUrls: ['./instructors-view.component.scss']
})
export class InstructorsViewComponent implements OnInit {
  instructorData:any;
  powers:any;
  pow:any;
  searchText:any;
  p: number = 1;

  constructor(
    private router: Router,
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
          console.log(response)
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

  deleteInstructor(data){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authenticationService.deleteInstructorData(data)
        .subscribe(
          response=>{
          
      if(response)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
            this.loadTableData();
          }
        )

      }
    })
   

  
  }

  navigateToEditPage(data){
    console.log('ds')
    this.router.navigate([ `/edit-instructor-page`, data._id])

  }


}
