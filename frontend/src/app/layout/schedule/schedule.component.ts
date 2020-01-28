import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedule:any; 
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private scheduleService:ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {

    this.loadTableData();
    
  }
  loadTableData() {
    let userId = this.currentUserSubject.value.user_id
    this.scheduleService.getMySchedule(userId)
    .subscribe(
      response=>{
        this.schedule = response;
        console.log(response)
      }
    )
  }
  routePage(data){
    console.log(JSON.stringify(data));
    this.router.navigate(['/schedule_plan', data.membershipId]);
    console.log("Navigate to Edit Group " + data.membershipId);
  }

}
