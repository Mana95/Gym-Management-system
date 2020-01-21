import { CatagoryService } from './../../../services/catagory.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
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

  cartData :any;


  constructor(
    private orderService: OrderService, 
    private router: Router,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.currentCartSubject = new BehaviorSubject<Cart>(
      JSON.parse(localStorage.getItem("cartObject"))
    );
    this.currentCart = this.currentCartSubject.asObservable();
      //console.log('constructor');
     // console.log(this.currentCartSubject.value);
  }

  ngOnInit() {
    this.loadDataCart();
  }

  loadDataCart() {
      this.cartData = this.currentCartSubject.value;
  }
}
