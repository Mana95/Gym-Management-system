import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-schedule-request',
  templateUrl: './schedule-request.component.html',
  styleUrls: ['./schedule-request.component.scss']
})
export class ScheduleRequestComponent implements OnInit {
  pendingSchedule:any;
  showMsg = false;
  constructor(
    private scheduleService:ScheduleService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {


    this.loadSchedules();
    
    


  }

  loadSchedules(){
    this.scheduleService.getPendings()
    .subscribe(
      response=>{
        console.log(response);
        this.pendingSchedule = response;
      })
  }

  UpdateRecord(data) {
    console.log(data._id);
    let UpdateData = {
      _id : data._id
    }
    this.scheduleService.updateRecord(UpdateData)
    .subscribe(
      response=>{
        console.log(response);
        this.showMsg = true;

        Swal.fire({
          text: 'Schedule Approved Successfully !',
          icon: 'success'
        });


        setTimeout(()=>{ 
          this.showMsg = false;
          this.loadSchedules();
        }, 2000);
        
      }
    )
  }

  
  RejectRecord(data) {
    let id  = data._id
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
      if(confirmed==true){
       alert('User confirmed:')

        this.scheduleService.RejectRecord(id)
        .subscribe(
          response=>{
            console.log(response);
          }
        )

      }
    
    }
     )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }
}
