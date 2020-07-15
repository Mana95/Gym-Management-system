import { Router } from '@angular/router';
import { ScheduleService } from './../../../services/schedule.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.scss']
})
export class AllSchedulesComponent implements OnInit {
  AllSchedule:any;
  userId:any;
  p: number = 1;
  constructor(
    private authenticationService:AuthenticationService,
    private scheduleService:ScheduleService,
    private router: Router,

  ) { 
    this.userId = this.authenticationService.currentUserValue.user_id;
    console.log('userid')
    console.log(this.userId);
  }

  ngOnInit() {
    this.loadTableData();
  }
  loadTableData() {
    this.scheduleService.loadMyAllSchedule(this.userId)
    .subscribe(
      result=>{
        console.log(result)
        console.log(result);
        this.AllSchedule = result;
      }
    )
  }
  
  routePage(data) {
    console.log(JSON.stringify(data));
    this.router.navigate(['/acceptedSchedule', data._id]);
    // this.router.navigate(['/schedule_plan', data.membershipId]);
    
  }

}
