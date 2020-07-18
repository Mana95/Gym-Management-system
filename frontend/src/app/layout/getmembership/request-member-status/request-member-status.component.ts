import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-member-status',
  templateUrl: './request-member-status.component.html',
  styleUrls: ['./request-member-status.component.scss']
})
export class RequestMemberStatusComponent implements OnInit {
  requestMembershipStatus :any;
  searchText;
  p =1;
  email : string;
  constructor(
    private authenticationService :AuthenticationService

  ) { 
   this.email =  this.authenticationService.currentUserValue.email;
  }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    console.log(this.email)
    this.authenticationService.getReleventMembshipStatusData(this.email)
    .subscribe(
      response=>{
        console.log(response);
        this.requestMembershipStatus = response;
      }
    )




  }
}
