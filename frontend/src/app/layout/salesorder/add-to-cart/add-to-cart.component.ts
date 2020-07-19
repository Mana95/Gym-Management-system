import { CheckoutComponent } from './../checkout/checkout.component';
import { CatagoryService } from './../../../services/catagory.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/_models/cart';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  private currentCartSubject: BehaviorSubject<Cart>;
  public currentCart: Observable<Cart>;
  viewCartForm: FormGroup
  cartData: any;
  totalValue = 0;
  cartId: any;
  showMessage = false;
  showPaymentButtondisabled = false;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {

    //console.log('constructor');
    // console.log(this.currentCartSubject.value);
  }

  ngOnInit() {
     //Id Gen
 var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
 var string_length = 8;
 var id = 'C_' + '';
 for (var i = 0; i < string_length; i++) {
   var rnum = Math.floor(Math.random() * chars.length);
   id += chars.substring(rnum, rnum + 1);
  }
  this.cartId = id;





    this.loadDataCart();
    console.log('dsa');

  }

  loadDataCart() {
    this.totalValue = 0;
    this.currentCartSubject = new BehaviorSubject<Cart>(
      JSON.parse(localStorage.getItem("cartObject"))
    );

    this.currentCart = this.currentCartSubject.asObservable();
    this.cartData = this.currentCartSubject.value;

    for (var x = 0; x < this.cartData.length; x++) {
      let atyNumer = this.cartData[x].totalPrice

      this.totalValue += atyNumer;


    }

  }

  changeValue(inputNumber, data) {
    if(this.checkQuanityOfTheItem(data ,inputNumber)){
    this.changeCartData(inputNumber.value, data)
    this.loadDataCart();
  }
  }


  changeCartData(inputNumber, data) {
    //localStorage.setItem('cartObject', JSON.stringify(data));

    let cart = JSON.parse(localStorage.getItem('cartObject'));
    let isInCart = false;
    if (cart) {
      //console.log('Cart');
      // console.log(cart);
      isInCart = cart.some(item => item.id === data.id);
    } else {
      cart = [];
    }

    if (isInCart) {
      cart.map(item => {
        if (item.id === data.id) {
          if (item.qty > inputNumber) {
            item.qty = inputNumber;
            let newTotal = inputNumber * item.sellingPrice;
            item.totalPrice = newTotal;
            console.log(data.qty)
            this.loadDataCart();
          }
          else {

            item.qty = Number(inputNumber);
            let newTotal = Number(inputNumber) * item.sellingPrice;
            item.totalPrice = newTotal;
            this.totalValue = 0;
            this.loadDataCart();
          }
        }
        return item;
      });
    } else {
      cart.push(data);
    }
    localStorage.setItem('cartObject', JSON.stringify(cart));
    return
  }

  onSubmit() {
    let cartData = {
      cartTotal :this.totalValue,
      CartValues : this.cartData,
      cartId:this.cartId
  }


 
    const modelRef = this.modalService.open(CheckoutComponent, {size:'lg'});

    modelRef.componentInstance.user = cartData;
    modelRef.result.then((result) => {
      if (result) {
      //  this.loadData();
      }
      });


    console.log(this.cartData);
  
  //   if(cartData.cartTotal!=undefined && cartData.CartValues !=undefined && cartData.cartId !=undefined){
  // //  const saveData = this.orderService.saveCartData(cartData);
  // console.log('hi')
  // this.orderService.saveCartData(cartData)
  // .subscribe(
  //   reponse=>{

  //     if(reponse==1){

  //     }
  //   }
  // )
  //   }



  }

  deleteCartItems(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this selected item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your selected item has been deleted.',
        'success'
      )
      this.authenticationService.deleteCartItem(data);
      this.loadDataCart();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your selected item is safe :)',
        'error'
      )
      }
    })

  }

  checkQuanityOfTheItem(data ,inputNumber) {
    if(data!=undefined){
    var selectedQuanity = Number(inputNumber.value);
    var quantityValue = data.avlableQty;
    var curentQty =  data.qty;
    if(selectedQuanity>=quantityValue){
      data.qty = curentQty
      this.showMessage = true;
      this.showPaymentButtondisabled = true;
        return false;
    }

  }
  this.showMessage = false;
  this.showPaymentButtondisabled = false;
  return true;
  }
  enabalityOfPaymentButton(inputNumber){
    var inputValue = inputNumber.value;
    if(inputValue !=""){
      this.showPaymentButtondisabled = true;
      return;
    }
    this.showPaymentButtondisabled = false;
  }
}
