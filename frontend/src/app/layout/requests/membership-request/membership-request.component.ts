import Swal from 'sweetalert2/dist/sweetalert2.js';


import { AuthenticationService } from './../../../services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-membership-request',
  templateUrl: './membership-request.component.html',
  styleUrls: ['./membership-request.component.scss']
})
export class MembershipRequestComponent implements OnInit {
  membershipData:any;
  constructor(
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,

  ) { }

  ngOnInit() {

    this.loadTableData();
   
  }

  loadTableData() {
    this.authenticationService.getByPendingMembership()
    .subscribe(
      response=>{
        this.membershipData = response;
      },
      error=>{
        console.log(error);
      }
    
    )
  }

  updateStatus(rowData) {

  console.log(rowData)

  let updatesData = {
    id:rowData.membershipId,
    role:'Membership',
    status: true
    
  }

    this.authenticationService.updateStatus(updatesData)
    .subscribe(
      response =>{
       
        if(response == 1 ){
          Swal.fire({  text: 'Membership Registered done!',
          icon: 'success'
        }
        );
        }else{
          Swal.fire('Oops...', `Something went wrong`, 'error')
        }
       
        this.loadTableData();
      }
    )
  }

  updateAcceptInactiveStatus(data){

    this.authenticationService.updateActiveIncativeStatusMembership(data)
    .subscribe(
      res=>{
        if(res==1){
          Swal.fire({  text: 'Membership has bee RejectedI😕!',
          icon: 'success'
        }); 
        this.loadTableData();
        }
      }
    )
  }


}
