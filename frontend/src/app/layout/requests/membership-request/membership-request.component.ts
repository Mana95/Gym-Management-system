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
    status: true
    
  }

    this.authenticationService.updateStatus(updatesData)
    .subscribe(
      response =>{
        console.log(response);
        this.loadTableData();
      }
    )
  }




}
