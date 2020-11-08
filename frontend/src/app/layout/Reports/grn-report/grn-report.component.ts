import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GymAdapterClass } from 'src/app/common-class/gym-adapterClass';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-grn-report',
  templateUrl: './grn-report.component.html',
  styleUrls: ['./grn-report.component.scss']
})
export class GrnReportComponent implements OnInit {
  reportGroup : FormGroup;
  submitted =false;
  fromDate: Date
  toDate: Date;
  supplierName: string = '';
  itemStatus: boolean = true;
  grnStatus: string = 'all';
  catQuantities: any = [];
  grnType : string = 'with Item'
  

  statusArray = ['Done' , 'Pending'];
  constructor(
    private formBuilder :FormBuilder,
   private reportsService:ReportsService
  ) { }

  ngOnInit() {
 

  }

  get f(){
    return this.reportGroup.controls;
  }

  onClickGenerateReport() {
    this.submitted = true;
     if(this.fromDate!=undefined && this.toDate !=undefined){
      let grnDetails = {
        fromDate :this.fromDate,
        toDate :this.toDate,
        supplierName : this.supplierName,
        type:this.grnType
      }
      this.reportsService.getGRNReport(grnDetails)
      .subscribe(
        res=>{
          let reportDetails = {
            reportName :(this.grnType == 'with Item')?'Item wise GRN report':'GRN summary report',
            fromDate :this.fromDate,
            toDate :this.toDate,
            supplierName : this.supplierName,
            response : res
          }
         if(this.grnType == 'wihout item'){
           console.log('dsdsdsdsdsA')
          const documentDefinition = GymAdapterClass.getGRNDocumentDefinition(reportDetails);
          pdfMake.createPdf(documentDefinition).open();
         }else{
          const documentDefinition = GymAdapterClass.getGRNItemDocumentDefinition(reportDetails);
          pdfMake.createPdf(documentDefinition).open();
         }
        }
      )
     }
  }

}
