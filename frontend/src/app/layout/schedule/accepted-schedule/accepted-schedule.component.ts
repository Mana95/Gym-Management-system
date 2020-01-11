import { User } from './../../../_models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScheduleService } from './../../../services/schedule.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accepted-schedule',
  templateUrl: './accepted-schedule.component.html',
  styleUrls: ['./accepted-schedule.component.scss']
})
export class AcceptedScheduleComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  ScheduleMakeGroup:FormGroup;
  submitted = false;
  id:any;
  Display = false;

  constructor(
     private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private scheduleService:ScheduleService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
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
      nameOfSchedule:[''],
      scend:[''],
      numberOfTickets: ['', Validators.required],
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

    let currentUser = this.currentUserSubject.value.username;
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
  
  normalSchduleBoard() {
    //alert('hi')
    this.Display = true;
    
  }

  onClickTickets(e){
    this.t.push(this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      empType:['',Validators.required],
      startDate:['',Validators.required]
  }));
  }

  onClickRemove(i){
    let length = this.t.length;
   // console.log(length);
    this.t.removeAt(i);
  }


  onSubmit() {
    this.submitted = true;
    alert(this.f.ExerciseName.value);
  }
 
}
