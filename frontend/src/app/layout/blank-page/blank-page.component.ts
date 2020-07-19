import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceDetailModalComponent } from './invoice-detail-modal/invoice-detail-modal.component';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    p: number = 1;
  searchText:any;
  paymentDetails:any;
    constructor(
    private formBuilder:FormBuilder,
    private orderService:OrderService,
    private modalService: NgbModal,
    ) {}

    ngOnInit() {
        this.loadTableData();

    }

    loadTableData() {
        this.orderService.loadAllinvoiceData()
        .subscribe(
            res=>{
                console.log(res);
                this.paymentDetails =res;
            }
        )
    }

    popmodalPaymentDetails(data) {
        const modelRef = this.modalService.open(InvoiceDetailModalComponent, {size:'lg'});
        
     modelRef.componentInstance.user = data;
     modelRef.result.then((result) => {
        if (result) {
        //  this.loadData();
        }
        });
    }
}
