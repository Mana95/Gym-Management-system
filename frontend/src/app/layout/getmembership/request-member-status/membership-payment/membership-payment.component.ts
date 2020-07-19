import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-membership-payment',
  templateUrl: './membership-payment.component.html',
  styleUrls: ['./membership-payment.component.scss']
})
export class MembershipPaymentComponent implements OnInit {
  @Input() public user;
  paymentGroup :FormGroup;
  submitted = false;
  imageUrl:any ='';
  payamentRecipt = false;
  invoiceId:string;
  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService:AuthenticationService,
    private formBuilder:FormBuilder,
    private orderService:OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.paymentGroup = this.formBuilder.group({
      firstName:[''],
      paymentPrice:[''],
      document:['', Validators.required]
    })
    this.loadFormData();
  }
  loadFormData() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "I_2020" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.invoiceId = id;
    }


    var details = this.user;
    console.log(details);
    this.paymentGroup.controls['firstName'].setValue(details.firstName);
    this.paymentGroup.controls['paymentPrice'].setValue(details.amount);
  }

  get f() {
    return this.paymentGroup.controls;
  }

  uploadFile(event) {
    const fileEvnet = event.target.files[0];
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    reader.readAsDataURL(file);

// When file uploads set it to file formcontrol
reader.onload = () => {
  this.imageUrl = reader.result;
  this.payamentRecipt = true;
  this.paymentGroup.patchValue({
    document: reader.result
  });
 
}
this.cd.markForCheck();
console.log(this.imageUrl);

  }
  onSubmit() {
    this.submitted = true;
    if(this.imageUrl == ''){
      Swal.fire('Oops...', `Please attached the receipt`, 'error')
    }
    if(this.paymentGroup.valid){

      let invoiceDetails = {
        invoiceId :this.invoiceId,
        userId :this.user.customerID,
        invoiceType: 'Membership card',
        paymentTotal:this.user.amount,
        paymentrecipt:this.imageUrl,
        email:this.user.email,
        invoicePrinted :false,
        invoiceDetails:'Peniding'
      }

      //invoice saveing
      this.authenticationService.saveMembershipReciptDetails(invoiceDetails)
      .subscribe(
        response=>{
          console.log(response)
          if(response ==1 ){
            Swal.fire({
              text: 'Payment Details submitted',
              icon: 'success'
            });
            
          }
        }
      )





    }else {
      Swal.fire('Oops...', `Please attached the receipt`, 'error')
    }



  }

}
