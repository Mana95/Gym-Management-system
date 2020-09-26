import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GymAdapterClass } from 'src/app/common-class/gym-adapterClass';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  searchText:string;
  orderData:any;
  p:1;
  logInUserData:any;
  constructor(private orderService:OrderService , private authenticationService: AuthenticationService) { 

    this.logInUserData =this.authenticationService.currentUserValue;

  }

  ngOnInit() {
    this.loadMyOrders();
  }


  loadMyOrders(){

      this.orderService.loadMyOrders(this.logInUserData.user_id)
      .subscribe(res=>{
        this.orderData = res;
      })


  }
  printOrderRecipt(data) {
const documentDefinition = GymAdapterClass.getDocumentDefinition(data);
pdfMake.createPdf(documentDefinition).open();
  }

}
