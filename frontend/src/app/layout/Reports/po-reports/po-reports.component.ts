import { purchaserOrderList } from './../../../_models/item';
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
  showChart = false;
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
  purchaserOrderList:any;
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData:ChartDataSets[];
  // public barChartData: ChartDataSets[] = [
  //   { data: [10,20,30,40,50,60,70,100,110], label: 'Series A' }
  // ];


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
  
    }

  get f(){
    return this.reportGroup.controls;
  }

  //date Range
  dateRange(startDate , endDate) {
    var start      = startDate.split('-');
    var end        = endDate.split('-');
    var startYear  = parseInt(start[0]);
    var endYear    = parseInt(end[0]);
    var dates      = [];
    for(var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        var displayMonth = month < 10 ? '0'+month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;

  }

//submitForm
  onSubmit(){
    this.showChart = true;
    const m = moment(this.f.fromDate.value);
    this.submitted = true;
    if(this.reportGroup.valid){
      let reportGenData = {
        fromDate:this.f.fromDate.value,
        toDate:this.f.toDate.value,
        supplierName:this.f.supplierName.value,
        status:this.f.status.value,
      }
      var start = new Date(Date.parse(this.f.fromDate.value));
      var end = new Date(Date.parse(this.f.fromDate.value));
      var startDate = this.f.fromDate.value;
      var endDate = this.f.toDate.value;
     const date = this.dateRange(startDate , endDate);
    //    assign x Values in chart
        this.barChartLabels = date
      this.reportPurchaseOrderData = reportGenData;
      this.reportsService.generatePurchaseOrderReport(reportGenData)
      .subscribe(
        respose=>{
          if(respose != undefined){
            this.purchaserOrderList = respose
            var arrayData = [];
            var data=[];
            arrayData.push(respose);
          //  console.log(this.purchaserOrderList[1].categoryName);
            const documentDefinition = this.getDocumentDefinition(respose ,this.reportPurchaseOrderData);
           for(var x=0; x< respose.length ; x++){
            //console.log(this.purchaserOrderList[x])
            if(respose[x].totalAmount !=undefined){
             const arraypurchaseOrder = respose[x].totalAmount;
         
             data.push(arraypurchaseOrder);
            }
           }
           console.log(data)
           let barchartData ={
             data:data,
             label:'Series A' 
           }
        //   this.barChartData[0].data.push(data);
        //   this.barChartData[0].data.push(data)
            const sepecficData = this.barChartData = [
              {
                data:data,
                label:'Series A' 
              }
            ]
            this.showChart =true

           console.log(sepecficData);
         
       
        
           
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





  //Report Generation for the purchase order
  getDocumentDefinition(responseData ,data){

    //console.log(responseData);
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
