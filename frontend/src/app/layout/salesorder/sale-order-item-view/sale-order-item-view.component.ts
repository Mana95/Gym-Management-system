import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from 'src/app/services/catagory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sale-order-item-view',
  templateUrl: './sale-order-item-view.component.html',
  styleUrls: ['./sale-order-item-view.component.scss']
})
export class SaleOrderItemViewComponent implements OnInit {
  itemCartData:any;
  constructor(
    private orderService: OrderService, 
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadItemDetails()
  }

  //Load the relevent Item data
  loadItemDetails(){
    let id =  (this.route.snapshot.paramMap.get('id'))
    this.orderService.loadNavigateItemDetials(id)
    .subscribe(
      data=>{
        console.log('data')
        console.log(data);
        this.itemCartData = data;
      }
    )
  }
}
