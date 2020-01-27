import { ScheduleService } from './../../../services/schedule.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from "moment";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-newschedule',
  templateUrl: './newschedule.component.html',
  styleUrls: ['./newschedule.component.scss']
})
export class NewscheduleComponent implements OnInit {
  requestScheduleGroup:FormGroup;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  
  Type:any;
  submitted =false;
  loading = false;
  showMsg = false;
  alertDisplay = false;

  currentTime:any;
  currentDate:any;
  private notifier: NotifierService;

  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService : ScheduleService,
    notifier: NotifierService 
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.notifier = notifier;;
   }

  ngOnInit() {
    this.requestScheduleGroup = this.formBuilder.group({
      id:[''],
      date:[''],
      email:[''],
      mId:[''],
      currnetJoinDate:[''],
      typeName:['', Validators.required],
      description:['']

    });
   // console.log('HOOOOO')
    this.currentTime = moment().format("LT");
    this.currentDate = moment().subtract(10, "days").calendar();
    this.requestScheduleGroup.controls['mId'].setValue(this.currentUserSubject.value.user_id)
    this.requestScheduleGroup.controls['date'].setValue(this.currentDate)


    this.loadNewId();
    this.displayData();
  }

 get f() {
    return this.requestScheduleGroup.controls;
  }




  displayData(){

    this.scheduleService.getscedultType()
.subscribe(
  data=>{
    console.log(data);
   
    this.Type = data;
  }
)
 
this.requestScheduleGroup.controls["date"].setValue(
  this.currentDate
);
  }

  loadNewId(){
 //Id Gen  
 var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
 var string_length = 8;
 var id = "SCH_" + "";
 for (var i = 0; i < string_length; i++) {
   var rnum = Math.floor(Math.random() * chars.length);
   id += chars.substring(rnum, rnum + 1);
   this.requestScheduleGroup.controls["id"].setValue(id);
 }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    let formData = {
      Sid: this.f.id.value,
      membershipId:this.f.mId.value,
      type:this.f.typeName.value,
      status:1,
      date:this.f.date.value,
      description:this.f.description.value
    }

      console.log(formData);

    if(this.requestScheduleGroup.valid){

      this.scheduleService.insertScheduleData(formData)
      .subscribe(
        response=>{
          console.log(response);
         
          if(response == 1){
            this.alertDisplay = false;
            this.showMsg = true;
          }else{
            this.showMsg = false;
            this.alertDisplay = true;
          }
        },
        error=>{
          console.log(error);
        },
        ()=>{
          
          let type = 'success';
          let message = 'Data is Success';

          this.notifier.notify( type, message );



          this.loadNewId();
        }
      )

    }

  }

}
