import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageAlertDisplay } from 'src/app/common-class/message-alert-display';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchText:any;
  closeResult: string;
  rejectedForm :FormGroup;
  p: number = 1;
  cusData:any;
  submitted = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modal: NgbModal,
  
    private formbuilder:FormBuilder,
  ) { }

  ngOnInit() {
    this.rejectedForm = this.formbuilder.group({
      rejectedReason:['',Validators.required]
    })
    this.loadData();
    

  }
  get f() {
    return this.rejectedForm.controls;
  }
  loadData() {
    this.authenticationService.getAllMembership()
    .subscribe(
      res=>{
        console.log(res);
        this.cusData = res;

      }
    )
  }
  routePage(data) {
    
  //console.log(JSON.stringify(data));
  MessageAlertDisplay.confirmationMessage(`View ${data.firstName} membership information` , `Yes, View `, 'info').then((res)=>{
    if (res.value ==true){
      localStorage.setItem('membership', JSON.stringify(data));
      this.router.navigate(['/viewMembership', data._id]);
    }
  })
  
  console.log("this is the number which have been passed to the Edit User page " + data._id);

  }

  inactiveMembership(selectedMembership ,content) {
    this.rejectedForm.reset();
    MessageAlertDisplay.confirmationMessage(null , 'Yes, Inactive membership', 'warning').then( (res)=>{
      if (res.value ==true){
        this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed swith: ${result}`;
        }, (reason) => {
         // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
         if(reason !=undefined){
           
          this.authenticationService.inActiveMembership({selectedMembership  , reason})
          .subscribe(
            response=>{
              if(response==1){
                Swal.fire(
                  'Membership inactive!',
                  'Your imaginary file has been inactive.',
                  'success'
                )
                    this.loadData();
              }
            }
          );
         }
        });





        return;
       
      }
    })
    
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to recover this imaginary file!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     this.authenticationService.inActiveMembership(selectedMembership)
    //     .subscribe(
    //       response=>{
    //         if(response==1){
    //           Swal.fire(
    //             'Deleted!',
    //             'Your imaginary file has been deleted.',
    //             'success'
    //           )
    //               this.loadData();
    //         }
    //       }
    //     );
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //   Swal.fire(
    //     'Cancelled',
    //     'Your imaginary file is safe :)',
    //     'error'
    //   )
    //   }
    // })
  }

  checkIfDisabled(data){
      if(data.status != 'true'){
          return true;
      }
      return false;
  }

  onSubmit() {
      this.submitted =true;
      if(this.rejectedForm.valid){
        let rejectOb = {

          status: "7",
          rejectedReason:this.f.rejectedReason.value,
        }
        this.modal.dismissAll(rejectOb)
      }
  }

  checkStatus(data){
  
    switch(data.status) {
      case '1':
             return {color:'DarkCyan' , message:'Membership request approval process' ,icon:'fa fa-clock-o'}
        break;
        case '2':
           return {color:'DarkOrange' , message:'Membership is in payment process' ,icon:'fa fa-retweet'}
        break;
        case '3':
          return {color:'DarkOrange' , message:'Membership is in payment  process' ,icon:'fa fa-retweet'}
        break;
        case '4':
          return {color:'DarkOrange' , message:'Membership payment  process' ,icon:'fa fa-retweet'}
        break;
        case '5':
          return {color:'green' , message:'Membership active' ,icon:'fa fa-check'}
        break;
        case '6':
          return {color:'DarkRed' , message:'Membership payment rejected' ,icon:'fa fa-times-circle'}
        break;
        case '7':
          return {color:'red' , message:'Membership inactive' ,icon:'fa fa-user-times'}
          break;
    }  
  }



}
