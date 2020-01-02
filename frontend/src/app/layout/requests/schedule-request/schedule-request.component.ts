import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-schedule-request',
  templateUrl: './schedule-request.component.html',
  styleUrls: ['./schedule-request.component.scss']
})
export class ScheduleRequestComponent implements OnInit {
  pendingSchedule:any;
  constructor(
    private scheduleService:ScheduleService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {

    this.scheduleService.getPendings()
    .subscribe(
      response=>{
        console.log(response);
        this.pendingSchedule = response;
      }
    )


  }



  UpdateRecord(data) {
    let id  = data._id
    alert(id);

    this.scheduleService.updateRecord(id)
    .subscribe(
      data=>{
        console.log(data);
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
