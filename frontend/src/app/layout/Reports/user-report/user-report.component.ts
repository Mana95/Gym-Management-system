import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { Role } from 'src/app/_models/role';
import * as moment from 'moment'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {
  reportGroup:FormGroup;
  submitted = false;

  roleArray = ['Employee', 'Admin','Supplier','Membership','Istructor'];

  constructor(
    private formBuilder :FormBuilder,
    private reportsService:ReportsService
  ) { }

  ngOnInit() {
    this.reportGroup = this.formBuilder.group({
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      supplierName:[''],
      role:[''],
      status:['']
   })
  }

  get f(){
    return this.reportGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.reportGroup.valid){

      let reportGenData = {
        fromDate:this.f.fromDate.value,
        toDate:this.f.toDate.value,
        firstName:this.f.supplierName.value,
        role:this.f.role.value,
        status:this.f.status.value
      }
      console.log(reportGenData);

      this.reportsService.getUserSummaryReportDetails(reportGenData)
      .subscribe(
        response=>{
          console.log('response');
          console.log(response);
          if(response !=2 && response.length !=0 ){
            const documentDefinition = this.getDocumentDefinition(response ,reportGenData );
            pdfMake.createPdf(documentDefinition).open();
          }
        },
        error=>{
          console.log(error);
        },
        ()=>{
          console.log('Completion');
        }
      )

    }

  }



   //Report Generation for the purchase order
   getDocumentDefinition(responseData ,data){

    //console.log(responseData);
    return {
      content: [
        {
             border: [true, true, true, true],
             text: `Users Summary Report`,
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
                {text: `Role Name: ${data.role}`},
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

  getPoTableData(userData) {
    console.log(userData)
    return {
      table:{
        widths: ['auto', 'auto', 'auto', 'auto','auto','auto','auto'],
        body: [
          [
            {
                text: "User Id",
                style: "tableHeader",
            },
            {
                text: "join date",
                style: "tableHeader",
            },
            {
              text: "Nic Number",
              style: "tableHeader",
          },
            {
                text: "Name",
                style: "tableHeader",
            },
            {
                text: "Role",
                style: "tableHeader",
            },
            {
              text: "email",
              style: "tableHeader",
          },
            {
                text: "status",
                style: "tableHeader",
            },
            
        ],
        ...userData.map((itm) => {
          return [
              itm.user_id,
              moment(itm.createdDate).format('L'),
              itm.nicNumber,
              itm.firstName,
              itm.role,
              itm.email,
              itm.active,
              
          ];
      })
        ]
      }
    }

  }


}
