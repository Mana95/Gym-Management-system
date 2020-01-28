import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-sales-order-request',
  templateUrl: './sales-order-request.component.html',
  styleUrls: ['./sales-order-request.component.scss']
})
export class SalesOrderRequestComponent implements OnInit {
  salesOrderData:any;
  constructor(   private orderService : OrderService) { }

  ngOnInit() {

    this.loadTableData();


    
  }

  loadTableData() {
    this.orderService.getAllSo()
    .subscribe(
      response=>{
        console.log(response)
        this.salesOrderData = response
      }
    )
  }
 
}

