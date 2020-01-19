import { User } from './../../../_models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScheduleService } from './../../../services/schedule.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from "moment";

@Component({
  selector: 'app-accepted-schedule',
  templateUrl: './accepted-schedule.component.html',
  styleUrls: ['./accepted-schedule.component.scss']
})
export class AcceptedScheduleComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  buttonDisplay = false;
  ScheduleMakeGroup:FormGroup;
  submitted = false;
  id:any;
  currentDate:any;
  begginer = false;
  buttonProDisplay = false;

  Display = false;

  constructor(
     private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private scheduleService:ScheduleService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser);
     }

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
      endDate:[''],
      nameOfSchedule:['', Validators.required],
      BMI:[''],
      validMonth:['', Validators.required],
      beginner: new FormArray([]),
      tickets: new FormArray([]),
      tuesday:new FormArray([]),
      wednesday:new FormArray([]),
      thursday:new FormArray([]),
      friday:new FormArray([]),
      satarday:new FormArray([]),
      sunday:new FormArray([]),
    })


    this.loadFormUniqueId();
    this.loadFormData();
    this.loadinstructor();


  
  }

  DateCalculator() {
    let dm = moment();
    let todayDate = dm.format('L');
    let MonthAsNumber = this.f.validMonth.value
    console.log(MonthAsNumber);
    let addDays = dm.add(MonthAsNumber, 'months');
    let convertDate = addDays.format('L');
    this.ScheduleMakeGroup.controls['endDate'].setValue(convertDate);
  }



  loadinstructor() {
    let data1 = this.currentUserSubject.value;
  // alert(data._id);
        this.scheduleService.loadInstrucotrData(data1.user_id)
        .subscribe(
          data=>{
            console.log('dadsadsa');
            console.log(data);
            this.ScheduleMakeGroup.controls['instructorName'].setValue(data[0].firstName);
            this.ScheduleMakeGroup.controls['contact'].setValue(data[0].phonenumber);
            this.ScheduleMakeGroup.controls['nameOfSchedule'].setValue(data[0].typeName);
          }
        )
      
      
  



  }

  loadFormUniqueId() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "NS_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.ScheduleMakeGroup.controls["id"].setValue(id);

     


      
      
    }
  }

  loadFormData() {
    let m = moment();
    let DateFormat = m.format('L');
  
    this.currentDate = DateFormat;
    this.ScheduleMakeGroup.controls['date'].setValue(DateFormat);
   // let currentUser = this.currentUserSubject.value.username;
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
  get t() { return this.f.tickets as FormArray; }
  

  get T() { return this.f.tuesday as FormArray;}

  get W() {return this.f.wednesday as FormArray;}

  get Th() {return this.f.thursday as FormArray;}

  get Fr() { return this.f.friday as FormArray;}

  get S() {return this.f.satarday as FormArray;}

  get Sun() {return this.f.sunday as FormArray;}

  get B() {return this.f.beginner as FormArray;}
  
  begginerScheduleBoard() {
    this.buttonProDisplay = true;
    this.Display = false;
    this.begginer = true;
   
  }


  normalSchduleBoard() {
    //alert('hi')
    this.buttonDisplay = true;
    this.begginer = false;
    this.Display = true;
    
    
  }  




  onclickremoveSunday(i){
    let length = this.Sun.length;
    // console.log(length);
     this.Sun.removeAt(i);
  }


  onClickBeginner(e){
    this.B.push(this.formBuilder.group({
      b_name: ['', Validators.required],
      b_title: ['', Validators.required],
      b_empType:['',Validators.required],
      b_startDate:['',Validators.required]
  }));
  
  }
  onclickSunday(e){
    this.Sun.push(this.formBuilder.group({
      sun_name: ['', Validators.required],
      sun_title: ['', Validators.required],
      sun_empType:['',Validators.required],
      sun_startDate:['',Validators.required]
  }));
  }

  onclickSat(e){
    this.S.push(this.formBuilder.group({
      s_name: ['', Validators.required],
      s_title: ['', Validators.required],
      s_empType:['',Validators.required],
      s_startDate:['',Validators.required]
  }));
  }

  onclickremoveSta(i){
    let length = this.S.length;
    // console.log(length);
     this.S.removeAt(i);
  }

  onclickFriday(e){
    this.Fr.push(this.formBuilder.group({
      f_name: ['', Validators.required],
      f_title: ['', Validators.required],
      f_empType:['',Validators.required],
      f_startDate:['',Validators.required]
  }));
  }

  onclickThursday(e){
    this.Th.push(this.formBuilder.group({
      th_name: ['', Validators.required],
      th_title: ['', Validators.required],
      th_empType:['',Validators.required],
      th_startDate:['',Validators.required]
  }));
  }

  onclickwednesday(e){
    this.W.push(this.formBuilder.group({
      w_name: ['', Validators.required],
      w_title: ['', Validators.required],
      w_empType:['',Validators.required],
      w_startDate:['',Validators.required]
  }));
  }
  onclickTuesday(e){
    this.T.push(this.formBuilder.group({
      t_name: ['', Validators.required],
      t_title: ['', Validators.required],
      t_empType:['',Validators.required],
      t_startDate:['',Validators.required]
  }));
  }

  onclickRemoveThursday(i){
    let length = this.Th.length;
    // console.log(length);
     this.Th.removeAt(i);
  }

  onclickRemoveFriday(i){
    let length = this.Fr.length;
    // console.log(length);
     this.Fr.removeAt(i);
  }

  onclickRemovewednesday(i){
    let length = this.W.length;
    // console.log(length);
     this.W.removeAt(i);
  }
  onclickRemoveTuesday(i){
    let length = this.T.length;
    // console.log(length);
     this.T.removeAt(i);
  }


  onClickTickets(e){
    this.t.push(this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      empType:['',Validators.required],
      startDate:['',Validators.required]
  }));
  }
  onClickRemoveBeginner(i) {
    this.B.removeAt(i);
  }
  onClickRemove(i){
    let length = this.t.length;
   // console.log(length);
    this.t.removeAt(i);
  }


  onSubmit() {
    this.submitted = true;

    let sceduleData = {
      id:this.f.id.value,
      type:this.f.type.value,
      membershipId: this.f.membershipId.value,
      date:this.f.date.value,
      memberName:this.f.memberName.value,
      height:this.f.height.value,
      weight:this.f.weight.value,
      gender:this.f.gender.value,
      BMI:this.f.BMI.value,
      instructorName:this.f.instructorName.value,
      contact:this.f.contact.value,
      endDate:this.f.endDate.value,
      nameOfSchedule:this.f.nameOfSchedule.value,     
      validMonth:this.f.validMonth.value,      
      tickets:this.f.tickets.value,
      wednesday:this.f.wednesday.value,
      thursday:this.f.thursday.value,
      friday:this.f.friday.value,
      satarday:this.f.satarday.value,
      sunday:this.f.sunday.value,
      beginner: this.f.beginner.value

    }

    console.log(sceduleData);

    this.scheduleService.createSchedule(sceduleData)
    .subscribe(
      response=>{
        console.log(response);
      },
    error=>{
      console.log(error)
    }
    )

  }
 
}
