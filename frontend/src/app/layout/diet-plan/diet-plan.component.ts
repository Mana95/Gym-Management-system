import { ScheduleService } from 'src/app/services/schedule.service';
import { User } from 'src/app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-diet-plan',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss']
})
export class DietPlanComponent implements OnInit {
  dietPlanGroup : FormGroup;
  submitted = false;
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  id:any;
  dietPlanView :any;

  constructor(
    private formBuilder : FormBuilder,
  
    private scheduleService : ScheduleService,
    private http : HttpClient,
    private modal: NgbModal
  )
{
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();
}
  ngOnInit(){
    this.id =  this.currentUserSubject.value.user_id;
    console.log(this.id);
    this.scheduleService.getDietMyPlanID(this.id)
    
    .subscribe(
      response=>{
        console.log(response);
      }
    )

  }

  onSubmit(){

  }



}

