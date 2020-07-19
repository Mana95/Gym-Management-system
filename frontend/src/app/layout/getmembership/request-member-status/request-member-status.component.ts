import { MembershipPaymentComponent } from './membership-payment/membership-payment.component';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-member-status',
  templateUrl: './request-member-status.component.html',
  styleUrls: ['./request-member-status.component.scss']
})
export class RequestMemberStatusComponent implements OnInit {
  requestMembershipStatus :any;
  searchText;
  pendingText : any;
  p =1;
  email : string;
  approvedStatus:any;
  constructor(
    private authenticationService :AuthenticationService,
    private modalService: NgbModal,
  ) { 
   this.email =  this.authenticationService.currentUserValue.email;
  }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {

    //get the pending membership status
    this.authenticationService.getReleventMembshipStatusDataPending(this.email)
    .subscribe(
      response=>{
        console.log(response);
        this.pendingText = response;
        this.approvedStatus = response;
      }
    )

    //get the rejeced status of the membership
    this.authenticationService.getReleventMembshipStatusData(this.email)
    .subscribe(
      response=>{
        console.log(response);
        this.requestMembershipStatus = response;
      }
    )




  }
//make the payment
  makePayment (data) {
    const modelRef = this.modalService.open(MembershipPaymentComponent, {size:'lg'});
    modelRef.componentInstance.user = data;
    modelRef.result.then((result) => {
      if (result) {
      //  this.loadData();
      }
      });


  }
}
