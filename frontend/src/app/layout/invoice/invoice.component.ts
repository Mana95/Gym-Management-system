import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  page = 1;
  p = 1;
  pageSize = 4;
  invoiceView:any
  searchText;
  constructor(
    private authenticationService :AuthenticationService
  ) { }

  ngOnInit() {
    this.loadInvoiceData();
  }

  loadInvoiceData(){
    this.authenticationService.loadAllinvoiceData()
    .subscribe(
      res=>{console.log(res)
        this.invoiceView = res;
      }
    )
  }
}
