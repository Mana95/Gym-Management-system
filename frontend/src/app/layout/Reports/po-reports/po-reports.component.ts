import { ReportsService } from './../../../services/reports.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

import * as moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-po-reports',
  templateUrl: './po-reports.component.html',
  styleUrls: ['./po-reports.component.scss']
})
export class PoReportsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  reportGroup:FormGroup; 
  submitted = false;
  statusArray = ['Completed' , 'Pending'];
  reportPurchaseOrderData :any;
  constructor(
   private formBuilder :FormBuilder,
   private reportsService:ReportsService
  ) { }

  ngOnInit() {
    this.reportGroup = this.formBuilder.group({
       fromDate:['',Validators.required],
       toDate:['',Validators.required],
       supplierName:[''],
       status:['']
    })

  }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public randomize(): void {
      // Only Change 3 values
      const data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      this.barChartData[0].data = data;
    }



    

  get f(){
    return this.reportGroup.controls;
  }

//submitForm
  onSubmit(){
    const m = moment(this.f.fromDate.value);
  
    this.submitted = true;
    if(this.reportGroup.valid){
      let reportGenData = {
        fromDate:this.f.fromDate.value,
        toDate:this.f.toDate.value,
        supplierName:this.f.supplierName.value,
        status:this.f.status.value,

      }
      this.reportPurchaseOrderData = reportGenData;
      this.reportsService.generatePurchaseOrderReport(reportGenData)
      .subscribe(
        respose=>{
          if(respose != undefined && respose != 2){
           
            const documentDefinition = this.getDocumentDefinition(respose ,this.reportPurchaseOrderData);
            pdfMake.createPdf(documentDefinition).open();

          }else{
            Swal.fire('Oops...',`No such data available Please filter different date`, 'error')
          }
          console.log(respose);
        }
      )
    }else{
      Swal.fire('Oops...',`Form Validation Falied`, 'error')
    }
   

  }

  getDocumentDefinition(responseData ,data){

    console.log(responseData);
    return {
      content: [
        {
             border: [true, true, true, true],
             text: `Purchase Order Summary Report`,
             bold: true,
             fontSize: 20,
             alignment: "center",
             margin: [0, 0, 0, 20],
         },
         {
         alignment: 'justify',
         columns: [
             {text: `Date to ${data.fromDate} for ${data.toDate}`},
          
             ]},
            
             {
              columns: [
                {text: `Supplier Name: ${data.supplierName}`},
                {text: `Status ${data.status} \n\n`},
                ]
             },
                   {
                       text: `Table Information have ${responseData.length}`,
                       style:'header1'
                     },
                     this.getPoTableData(responseData),
        
     ],
     styles: {
       header: {
         fontSize: 18,
         bold: true,
         alignment: 'left',
         margin: [0, 190, 0, 80]
       },
       header1: {
         fontSize: 18,
         bold: true,
         alignment:'center'
       },
       alighLeft:{
            alignment: 'right',
       },
       alignTEXT:{
              alignment: 'left',   
       },
       subheader: {
         fontSize: 14
       },
       superMargin: {
         margin: [20, 0, 40, 0],
         fontSize: 15
       }
     },
    
    }
  }

  getPoTableData(po_data) {

    return {
      table:{
        widths: ['auto', 'auto', 'auto', 'auto','auto','auto','auto'],
        body: [
          [
            {
                text: "PO No",
                style: "tableHeader",
            },
            {
                text: "PO Date",
                style: "tableHeader",
            },
            {
                text: "SupplierId",
                style: "tableHeader",
            },
            {
                text: "Supplier Name",
                style: "tableHeader",
            },
            {
              text: "Category Name",
              style: "tableHeader",
          },
            {
                text: "Amount",
                style: "tableHeader",
            },
            {
              text: "Status",
              style: "tableHeader",
          }, 
        ],
        ...po_data.map((itm) => {
          return [
              itm.purchaseOrderId,
              itm.time,
              itm.supplierId,
              itm.supllierFirstName + '' + itm.supplierLastName ,
              itm.categoryName,
              itm.currentUser,
              itm.status,
          ];
      })
        ]
      }
    }

  }

}
