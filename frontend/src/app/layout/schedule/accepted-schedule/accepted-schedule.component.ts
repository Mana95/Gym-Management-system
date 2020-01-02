import { ScheduleService } from './../../../services/schedule.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accepted-schedule',
  templateUrl: './accepted-schedule.component.html',
  styleUrls: ['./accepted-schedule.component.scss']
})
export class AcceptedScheduleComponent implements OnInit {
  ScheduleMakeGroup:FormGroup;
  submitted = false;
  id:any;

  constructor(
     private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private scheduleService:ScheduleService) { }

  ngOnInit() {
    this.ScheduleMakeGroup = this.formBuilder.group({
      id:[''],
      type:[''],
      membershipId:[''],
      date:[''],
      memberName:[''],
      height:[''],
      weight:[''],
      gender:[''],
      instructorName:[''],
      contact:[''],
      nameOfSchedule:[''],
      scend:['']
    })

    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.scheduleService.loadById(this.id)
    .subscribe(
      response=>{
        console.log(response);
        this.ScheduleMakeGroup.controls['membershipId'].setValue(response[0].membershipId);
        this.ScheduleMakeGroup.controls['type'].setValue(response[0].membershipId);
        this.ScheduleMakeGroup.controls['memberName'].setValue(response[0].firstName);
        this.ScheduleMakeGroup.controls['height'].setValue(response[0].Height);
        this.ScheduleMakeGroup.controls['weight'].setValue(response[0].Weight);
        this.ScheduleMakeGroup.controls['gender'].setValue(response[0].gender);

      }
    )
  }
  get f() {
    return this.ScheduleMakeGroup.controls;
  }
  onSubmit() {

  }
 
}
