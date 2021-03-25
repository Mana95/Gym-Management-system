import { GymAdapterClass } from './../../../common-class/gym-adapterClass';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CatagoryService } from 'src/app/services/catagory.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order-cart',
  templateUrl: './sales-order-cart.component.html',
  styleUrls: ['./sales-order-cart.component.scss']
})
export class SalesOrderCartComponent implements OnInit {
  cartData: any;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.loadCartTable();
  }

routePage(data) {
  const id =  data._id;
  this.router.navigate(['/ItemCartView', data._id]);

}
  // loading the cart Data
  loadCartTable() {
    this.orderService.loadCardItems()
    .subscribe(
      response => {
        console.log(response);
        this.cartData = response;
      }
    );
  }

  displayStandardFormat(price){
     return GymAdapterClass.formatMoney(price)
  }

}
