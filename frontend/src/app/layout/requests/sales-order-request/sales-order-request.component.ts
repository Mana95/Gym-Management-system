import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-order-request',
  templateUrl: './sales-order-request.component.html',
  styleUrls: ['./sales-order-request.component.scss']
})
export class SalesOrderRequestComponent implements OnInit {
  salesOrderData:any;
  constructor() { }

  ngOnInit() {
  }

}
