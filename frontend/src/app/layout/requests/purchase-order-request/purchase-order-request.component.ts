import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-order-request',
  templateUrl: './purchase-order-request.component.html',
  styleUrls: ['./purchase-order-request.component.scss']
})
export class PurchaseOrderRequestComponent implements OnInit {

  poData:any;
  constructor(
    private orderService : OrderService
  ) { }

  ngOnInit() {
    this.loadTableData();
   

  }
  loadTableData() {
    this.orderService.getPendingPo()
    .subscribe(
      response=> {
        console.log('RESPONSE1111')
        console.log(response);
        this.poData = response
      }
    )
  }
  process(data) {
    let val= {
      id:data._id,
      status: 'Approved'
    }
    this.orderService.updateStatus(val)
    .subscribe(
      response=>{
        console.log(response);
        this.loadTableData(); 
      }
    )

  }


}
