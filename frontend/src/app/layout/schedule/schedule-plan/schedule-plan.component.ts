import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule.service';

import * as jsPDF from 'jspdf';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-schedule-plan',
  templateUrl: './schedule-plan.component.html',
  styleUrls: ['./schedule-plan.component.scss']
})
export class SchedulePlanComponent implements OnInit {
  id:any;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  Done = false;
  displayData:any;
  tableData:any;
  createdDate:any;
  Enddate:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private scheduleService:ScheduleService
  ) { }

  ngOnInit() {

    this.loadCurrentData();
  }

  loadCurrentData() {
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.scheduleService.getById(this.id)
    .subscribe(
      get=>{
       // console.log(get);
        this.displayData = get[0];
        this.tableData = get[0].beginner;
        this.createdDate = get[0].date;
        this.Enddate = get[0].endDate;
        console.log(this.createdDate.date.getFullYear());
      }
    )


  }
  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }
  Start() {
    this.Done = true;
    window.print();
  }
}
