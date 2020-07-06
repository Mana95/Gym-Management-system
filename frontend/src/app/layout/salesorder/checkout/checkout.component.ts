import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() public user;
  checkoutDetail:any;
  logInUserData:any;
  currentDate:any;
  paymentGroup:FormGroup;
  submitted = false;
  showStatus = false;
  showMessage = false;
  invoiceId:any;
  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService:AuthenticationService,
    private formBuilder:FormBuilder,
    private orderService:OrderService,
  ) { 
    this.logInUserData =this.authenticationService.currentUserValue;
    
  }

  ngOnInit() {
    this.paymentGroup = this.formBuilder.group({
      userID :[''],
      cartId:[''],
      firstName:[''],
      lastName:[''],
      address:[''],
      email:[''],
      totalPrice:[''],
      balance:[''],
      payingPrice:['',Validators.required]
    })
    var m = moment();
    this.currentDate =m.format('L');
    this.checkoutDetail = this.user.CartValues;
  this.paymentGroup.controls['userID'].setValue(this.logInUserData.user_id);
  this.paymentGroup.controls['firstName'].setValue(this.logInUserData.firstName);
  this.paymentGroup.controls['lastName'].setValue(this.logInUserData.lastName);
  this.paymentGroup.controls['email'].setValue(this.logInUserData.email);
  this.paymentGroup.controls['totalPrice'].setValue(this.user.cartTotal);
  this.generateId();
  }
  generateId() {
      //Id cart Gen  
      var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
      var string_length = 8;
      var id = "CI_" + "";
      for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        id += chars.substring(rnum, rnum + 1);
        
      }
      this.paymentGroup.controls['cartId'].setValue(id);

  //    gen invoice ID
  //Id cart Gen  
  var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
  var string_length = 8;
  var iId = "I_" +moment().format('YYYY')+"";
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    iId += chars.substring(rnum, rnum + 1);
    
  }
    this.invoiceId =iId;
  }
  closeModel() {
    this.activeModal.close();
  }
  get f() {
    return this.paymentGroup.controls;
  }
  onSubmit() {
this.submitted=true;
 if(Number(this.f.totalPrice.value) >= Number(this.f.payingPrice.value)){
  Swal.fire('Oops...', `Please check your paying price is correct😊`, 'error');
  return;
 }
 if(this.paymentGroup.valid){
  let cartData ={
    cartId:this.f.cartId.value,
    invoiceId :this.invoiceId,
    userId:this.f.userID.value,
    email:this.f.email.value, 
    CartValues:this.user.CartValues,
    paymentDate:moment().format('L'),
    currentUserName:this.f.firstName.value,
    cartTotal:this.f.totalPrice.value,
    payingPrice:this.f.payingPrice.value,
    balancePrice:this.f.balance.value
  
   }
   let invoiceData = {
     invoiceId :this.invoiceId,
     transactionId:this.f.cartId.value,
     userId:this.f.userID.value,
     invoiceType:'cart Process',
     email:this.f.email.value,
     paymentTotal:this.f.totalPrice.value,
 }
 console.log(cartData);
 this.orderService.saveCartData(cartData ,invoiceData)
 .subscribe(
   res=>{
     if(res==1){
       console.log(res);
      Swal.fire({
        text: 'Payment is Success',
        icon: 'success'
      });
     }
   }
 )



 
 }else{
  Swal.fire('Oops...', `Please check your paying price is correct😊`, 'error');
   return;
 }





   }

  checkwithTotal(event) {
    var payingPrice = event.target.value;
    var balancePrice =this.user.cartTotal - Number(payingPrice);
    this.paymentGroup.controls['balance'].setValue(balancePrice); 
    const balance = Number(this.paymentGroup.controls['balance'].setValue(balancePrice)); 

    //   if(balance < 0){
    //       this.showMessage = true;
    // }
    // this.showMessage = false;
  }
}
