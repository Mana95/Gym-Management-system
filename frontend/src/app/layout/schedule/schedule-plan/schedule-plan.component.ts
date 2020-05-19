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
  tabDisplayTable = false;

  tableDataDisplayArray = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private scheduleService:ScheduleService,
  
  ) { }

  ngOnInit() {

    this.loadCurrentData();
  }
  log(event: boolean) {
    console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
  }


  loadCurrentData() {
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.scheduleService.getById(this.id)
    .subscribe(
      get=>{
        this.displayData = get
        if(get[0].scheduleCategoryType == 'Normal' ){
          this.tabDisplayTable = false;
          this.tableData = get[0].normal;
          this.createdDate = get[0].date;
          this.Enddate = get[0].endDate;
        }else{
          // push data to tableDataDisplayArray
          console.log(get);
       
          this.createdDate = get[0].date;
          this.Enddate = get[0].endDate;
          if(get[0].tickets.length !==0){
            this.tableDataDisplayArray.push(get[0].tickets);
            if(get[0].tuesday.length !==0){
              this.tableDataDisplayArray.push(get[0].tuesday);
            } if(get[0].wednesday.length !==0){
              this.tableDataDisplayArray.push(get[0].wednesday);
            }if(get[0].thursday.length !==0){
              this.tableDataDisplayArray.push(get[0].thursday);
            }if(get[0].friday.length !==0){
              this.tableDataDisplayArray.push(get[0].friday);
            } if(get[0].satarday.length !==0){
              this.tableDataDisplayArray.push(get[0].satarday);
            } if(get[0].sunday.length !==0){
              this.tableDataDisplayArray.push(get[0].sunday);
            }
          }

          console.log(this.tableDataDisplayArray);
          this.tabDisplayTable = true;
        }
     
      

      
      }
    )


  }
  public downloadAsPDF() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    
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

    doc.save('Schedule.pdf');
  }
  Start() {
    this.Done = true;
    window.print();
  }
}
