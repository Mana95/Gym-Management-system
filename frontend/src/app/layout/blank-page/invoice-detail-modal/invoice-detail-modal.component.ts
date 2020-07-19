import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-invoice-detail-modal',
  templateUrl: './invoice-detail-modal.component.html',
  styleUrls: ['./invoice-detail-modal.component.scss']
})
export class InvoiceDetailModalComponent implements OnInit {
  @Input() public user;
  paymentGroup :FormGroup;
  submitted = false;
  imageUrl:any ='';
  paymentDetailsStaus:any;
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
      invoiceId:[''],
      paymentPrice:[''],
      paymentDetails:['', Validators.required],
      rejectedreason:['']
    })
    this.loadFormData();
  }

  loadFormData(){
    this.paymentGroup.controls['invoiceId'].setValue(this.user.invoiceId);
    this.paymentGroup.controls['paymentPrice'].setValue(this.user.paymentTotal);
    this.imageUrl = this.user.paymentrecipt;

  }

  get f() {
    return this.paymentGroup.controls;
  }

  changeSuit() {
    
  }
  onSubmit() {
    this.submitted = true;
    if(this.f.paymentDetails.value == 'Rejected' && this.f.rejectedreason.value ==''){
      Swal.fire('Oops...', `Please Mention about the reason for rejected`, 'error');
      return;
    }

    if(this.paymentGroup.valid){

    }
  }
}
