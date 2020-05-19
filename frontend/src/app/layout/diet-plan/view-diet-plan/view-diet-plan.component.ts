import { ScheduleService } from 'src/app/services/schedule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {diet} from 'src/app/_models/diet';

@Component({
  selector: 'app-view-diet-plan',
  templateUrl: './view-diet-plan.component.html',
  styleUrls: ['./view-diet-plan.component.scss']
})
export class ViewDietPlanComponent implements OnInit {
  DietMealName: string;
  dietPlanId:string;
  scheuleId:string;
  membershiId:string;
  date:any;
  dietPlanDetails : diet;
  id:any;
  closeResult: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private scheduleService:ScheduleService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadCurrentData();
    console.log(this.dietPlanDetails);
  }

 

  loadCurrentData(){
    this.id = (this.route.snapshot.paramMap.get('id'));
      this.scheduleService.getDietMyPlan(this.id)
      .subscribe(
        response=>{
        this.dietPlanDetails = response;
        console.log(this.dietPlanDetails);
        }
      )


  }

  popUpModel(data){
      console.log(data);
  }

}
