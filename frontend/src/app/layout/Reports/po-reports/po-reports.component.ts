import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import * as moment from "moment";

@Component({
  selector: 'app-po-reports',
  templateUrl: './po-reports.component.html',
  styleUrls: ['./po-reports.component.scss']
})
export class PoReportsComponent implements OnInit {
  reportGroup:FormGroup;
  submitted = false;
  statusArray = ['Completed' , 'Pending'];

  constructor(
   private formBuilder :FormBuilder
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

//submitForm
  onSubmit(){
    const m = moment(this.f.fromDate.value);
  
    this.submitted = true;
  console.log(m.format());
    if(this.reportGroup.valid){
      let reportGenData = {

      }
    }else{
      Swal.fire('Oops...',`Form Validation Falied`, 'error')
    }
   

  }

}
