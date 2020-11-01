import { CatagoryService } from './../../../services/catagory.service';
import { ReportsService } from './../../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GymAdapterClass } from 'src/app/common-class/gym-adapterClass';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-item-report',
  templateUrl: './item-report.component.html',
  styleUrls: ['./item-report.component.scss']
})
export class ItemReportComponent implements OnInit {
  submitted: boolean = false;
  fromDate: Date
  toDate: Date;
  itemName: string = '';
  itemStatus: boolean = true;
  catogry: string = '';
  catQuantities: any = [];
  itemQuantity: any = [];
  constructor(private reportService: ReportsService,
    private catagoryService: CatagoryService) { }

  ngOnInit() {
    this.getAllCatgry();
  }
  getAllCatgry() {
    this.catagoryService.getCatNames()
      .subscribe(res => {
        this.catQuantities = res;
      })
  }


  onClickGenerateReport() {

    this.submitted = true;
    console.log('fromDate')
    if (this.fromDate != undefined && this.toDate != undefined) {
      if (this.catogry != '' && this.itemName == '') {

        return;
      }
      let itemReportData = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        itemName: this.itemName,
        itemStatus: this.itemStatus,
        catogry: this.catogry

      }

      this.reportService.getItemReport(itemReportData)
        .subscribe(
          res => {
            if(typeof res == 'string'){
              Swal.fire('Oops...', `${res}`, 'error');
            }
            let timerInterval
            Swal.fire({
              title: 'Please wait',
              html: 'Item report will open ',
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
                if(res && res.length && res.length > 0){
                  let reportDetail = {
                    reportName : 'Item sales summary',
                    fromDate : this.fromDate,
                    toDate: this.toDate,
                    responseData :res,
                    generateduser:'Manoj Prasanna'
                  }
                  const documentDefinition = GymAdapterClass.getItemDocumentDefinition(reportDetail);
                  pdfMake.createPdf(documentDefinition).open();
                }
              
              }
            })
          }
        )






    }

  }
  onChangeDisplayItemList() {

    let catNames = {
      name: this.catogry
    }
    this.catagoryService.getchoosenItems(catNames)
      .subscribe(res => {
        this.itemQuantity = res;

        
      })

  }

}
