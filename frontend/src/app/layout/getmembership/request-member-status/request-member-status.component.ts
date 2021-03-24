import { MembershipPaymentComponent } from './membership-payment/membership-payment.component';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
@Component({
  selector: 'app-request-member-status',
  templateUrl: './request-member-status.component.html',
  styleUrls: ['./request-member-status.component.scss']
})
export class RequestMemberStatusComponent implements OnInit {
  requestMembershipStatus :any;
  searchText;
  pendingText : any;
  p =1;
  email : string;
  approvedStatus:any;
  constructor(
    private authenticationService :AuthenticationService,
    private modalService: NgbModal,
  ) { 
   this.email =  this.authenticationService.currentUserValue.email;
  }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {

    //get the pending membership status
    this.authenticationService.getReleventMembshipStatusDataPending(this.email)
    .subscribe(
      response=>{
        console.log(response);
        this.pendingText = response;
        this.approvedStatus = response;
      }
    )

    //get the rejeced status of the membership
    this.authenticationService.getReleventMembshipStatusData(this.email)
    .subscribe(
      response=>{
        console.log(response);
        this.requestMembershipStatus = response;
      }
    )




  }
//make the payment
  makePayment (data) {
    const modelRef = this.modalService.open(MembershipPaymentComponent, {size:'lg'});
    modelRef.componentInstance.user = data;
    modelRef.result.then((result) => {
      this.loadTableData();
    
      });


  }

  generateMembershipCard(data) {
    // const documentDefinition = this.getDocumentDefinition(data);
    // pdfMake.createPdf(documentDefinition).open();

    // return;
    this.authenticationService.updateMembershipCardStatus(data)
    .subscribe(
      response=>{
        if(response==1){
          this.loadTableData();
          const documentDefinition = this.getDocumentDefinition(data);
          pdfMake.createPdf(documentDefinition).open();
          Swal.fire('Oops...', `login again for the system your privilages has been change`, 'error')
        }
        console.log(response);
      }
    )

  }

  paymentFailedModal (data) {
    console.log(data);
    //gettheInvoiceData
    const modelRef = this.modalService.open(MembershipPaymentComponent, {size:'lg'});
    modelRef.componentInstance.user = data;
    modelRef.result.then((result) => {
      this.loadTableData();
    
      });

  }

  change() {
    this.loadTableData();
  }
getDocumentDefinition(cus_data) {
   
    return {
      content: [
        {
          columns: [
            {
              image:
                'data:image/png;base64,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', width: 150,
            },
            [
              {
                text: 'Membership card',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'left',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Issue Date',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: `${cus_data.currnetJoinDate}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Membership Id',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: `${cus_data.membershipId}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Membership Period',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      {
                        text: `${cus_data.typeName} and ${cus_data.VMonth}`,
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        color: 'green',
                        width: 100,
                      },
                    ],
                  },
                    {
                    columns: [
                      {
                        text: 'Membership Name',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      {
                        text: `${cus_data.firstName}`,
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        color: 'black',
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'From',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'To',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: `${moment(cus_data.currnetJoinDate).format('LL')}`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: `${moment(cus_data.endDate).format('LL')}`,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Gym Address',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
            {
              text: 'Contact Number',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
              style: 'invoiceBillingAddress',
            },
            {
              text: '0775886862',
              style: 'invoiceBillingAddress',
            },
          ],
        },
        '\n\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'Mambership card Details',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 15,
        },
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 2;
            },
            paddingBottom: function(i, node) {
              return 2;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 80],
            body: [
              [
                {
                  text: 'Memberhsip Type',
                  fillColor: '#8080ff',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Total',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#8080ff',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              [
                {
                  text: `${cus_data.typeName}`,
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: `Rs ${cus_data.amount}`,
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              return '#eeeaea';
            },
            vLineColor: function(i, node) {
              return '#ewea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 3;
            },
            paddingBottom: function(i, node) {
              return 3;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [
              [
                {
                  text: `This is your membership card,It  will valid for only ${cus_data.typeName}. Please make sure to bring this form when you are comming to the Gym`,
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                },
             
              ],
           
             
            ],
          },
        },
        '\n\n',
        // {
        //   text: 'NOTES',
        //   style: 'notesTitle',
        // },
        // {
        //   text: 'This is memerbship card valid for only ',
        //   style: 'notesText',
        // },
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      }
    
    
    
      
    }
   }


}
