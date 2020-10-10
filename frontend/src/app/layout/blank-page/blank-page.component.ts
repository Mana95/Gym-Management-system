import { map, mergeMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceDetailModalComponent } from './invoice-detail-modal/invoice-detail-modal.component';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GymAdapterClass } from 'src/app/common-class/gym-adapterClass';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
        this.loadTableData();
        if (result) {
        //  this.loadData();
        }
        });
    }

    viewOrderRecipt(data) {
    this.orderService.getOrderById(data.orderId)
    .subscribe(res=>{
        let timerInterval
Swal.fire({
  title: 'Please wait',
  html: 'Order Reciept will open ',
  timer: 2000,
  timerProgressBar: true,
  showCancelButton: false,
  showConfirmButton: false,
  willOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    const documentDefinition = GymAdapterClass.getDocumentDefinition(res[0]);
    pdfMake.createPdf(documentDefinition).open();
  }
})
      
    })


    }


    printInvoice(data) {
     
        let responseResult:any;
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'Print invoice for the order',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-thumbs-up" aria-hidden="true"></i> Yes',
            cancelButtonText: '<i class="fa fa-thumbs-down" aria-hidden="true"></i> No',
            
          }).then((result) => {
            if (result.value) {
                
                this.orderService.getOrderById(data.orderId).pipe(map(res=>{
                    responseResult = res[0];
                        return responseResult;

                }),
                mergeMap(
                    result=>this.orderService.updateOrderInvoiceStatus(data , result))
                ).subscribe(res=>{
                    this.loadTableData()
                    const documentDefinition = GymAdapterClass.getInvoiceDocumentation(responseResult ,data);
                    pdfMake.createPdf(documentDefinition).open(); 
                })
            Swal.fire(
              {
                icon: 'success',
                title: 'Invoice printed',
              showConfirmButton: false,
              timer: 1500
            }
            )
        //     this.orderService.updateOrderInvoiceStatus(data , responseResult)
        //   .subscribe(res=>{
        //         console.log(res);
        //   })
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {


                Swal.fire({
                    icon: 'info',
                    title: 'Invoice not printed',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })

          
        }
    
       
}
