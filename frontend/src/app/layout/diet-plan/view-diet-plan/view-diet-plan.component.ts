import { ScheduleService } from 'src/app/services/schedule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  dietArray:any;
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
  }

 

  loadCurrentData(){
    this.id = (this.route.snapshot.paramMap.get('id'));
      this.scheduleService.getDietMyPlan(this.id)
      .subscribe(
        response=>{
          console.log(response);
          // this.DietMealName = response.dietPlanName;
          // this.dietPlanId = response.dietPlanId;
          // this.scheuleId = response.ScheduleId;
          // this.membershiId = response.membershipId;
          // this.dietArray = response.intervalNames;
        }
      )


  }

  popUpModel(data){
      console.log(data);
  }

}
