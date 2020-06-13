import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-grn-report',
  templateUrl: './grn-report.component.html',
  styleUrls: ['./grn-report.component.scss']
})
export class GrnReportComponent implements OnInit {
  reportGroup : FormGroup;
  submitted =false;
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
  
  get f(){
    return this.reportGroup.controls;
  }
  onSubmit() {
    this.submitted = true;

  }

}
