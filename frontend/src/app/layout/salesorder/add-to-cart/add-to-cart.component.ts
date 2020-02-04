import { CatagoryService } from './../../../services/catagory.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/_models/cart';

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

    this.changeCartData(inputNumber.value, data)
    this.loadDataCart();
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
    console.log(this.cartData);
    let cartData = {
        cartTotal :this.totalValue,
        CartValues : this.cartData
    }

  //  const saveData = this.orderService.saveCartData(cartData);
  this.orderService.saveCartData(cartData)
  .subscribe(
    reponse=>{
      
    }
  )

  }
}
