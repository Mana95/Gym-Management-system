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
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.authenticationService.deleteInstructorData(data)
        .subscribe(
          response=>{
            console.log(response);
            if(response)
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )
            this.loadTableData();
          }
        )
      
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
    })

  
  }

  navigateToEditPage(data){
    console.log('ds')
    this.router.navigate([ `/edit-instructor-page`, data._id])

  }


}
