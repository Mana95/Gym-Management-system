import { OrderService } from './../../services/order.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { User } from 'src/app/_models';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-diet-plan',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss']
})
export class DietPlanComponent implements OnInit {
  dietPlanGroup : FormGroup;
  submitted = false;
  view:any;
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  id:any;
  searchText;
  p: number = 1;
  dietPlanView :any;
  role : any;
  detailsOfDietPlan :any;


  constructor(
    
  
    private scheduleService : ScheduleService,
    private http : HttpClient,
    private modal: NgbModal
  )
{
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable(); 
  this.id =  this.currentUserSubject.value.user_id;

 
}
  ngOnInit(){
    
    //this.role =  this.currentUserSubject.value.role;
   
    this.loadDietMeal();

  }
  loadDietMeal() {
    //this.dietPlanView = [{id:1}];
    this.scheduleService.getDietMyPlanID(this.id)
    .subscribe(
      response=>{
        this.dietPlanView = response;
   console.log(this.dietPlanView.length);
      }
    )
  }
  onSubmit(){

  }

get getDietPlanData(){
  return this.dietPlanView;
}

}

