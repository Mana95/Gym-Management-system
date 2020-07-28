import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  //tableData : any;
  p: number = 1;
  searchText:any;
  schedule:any; 
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  dietPlanStatus  = false;


  constructor(
    private scheduleService:ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal
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
       // console.log(response)
        this.schedule = response;
      }
    )
  }
  routePage(data){
 
    this.router.navigate(['/schedule_plan', data.Sid]);
 
  }

  

  routeToDietPage(data) {
    this.router.navigate(['/view-diet-plan', data.Sid]);
  }

  CheckDietPlanStatus(data){
    
    var status = (data.dietPlan ==true)?true:false;
    return status;

}
}
