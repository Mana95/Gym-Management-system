import Swal from 'sweetalert2/dist/sweetalert2.js';


import { AuthenticationService } from './../../../services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageAlertDisplay } from 'src/app/common-class/message-alert-display';


@Component({
  selector: 'app-membership-request',
  templateUrl: './membership-request.component.html',
  styleUrls: ['./membership-request.component.scss']
})
export class MembershipRequestComponent implements OnInit {
  membershipData:any;
  p: number = 1;
  searchText:any;

  constructor(
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    
    private modal: NgbModal

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
    role:'Member',
    status: '2',
    AcceptedRejectedStatus:"Accepted",
    paymentStatus:false 
    
  };

 MessageAlertDisplay.confirmationMessage(null , 'Yes, Accept Membership', 'info').then((res)=>{
    if (res.value ==true){

      this.authenticationService.updateStatus(updatesData)
      .subscribe(
        response =>{
         
          if(response == 1 ){
            Swal.fire({  text: 'Membership Accepted done!',
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
  })


  }

  updateAcceptInactiveStatus(data){


  MessageAlertDisplay.confirmationMessage(null , 'Yes,Reject the request', null).then((res)=>{
    if (res.value ==true) { 
      this.authenticationService.updateActiveIncativeStatusMembership(data)
      .subscribe(
        res=>{
          if(res==1){
            Swal.fire({  text: 'Membership has bee RejectedI!',
            icon: 'success'
          }); 
          this.loadTableData();
          }
        }
      )
     }
  })
    
  }


}
