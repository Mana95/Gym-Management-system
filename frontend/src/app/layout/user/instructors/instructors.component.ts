import { AlertMessages } from 'src/app/_models/schedule-status';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { config } from './../../../config/config';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { map, mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})

export class InstructorsComponent implements OnInit {

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  registrationGroup: FormGroup;
  submitted = false;
  loading = false;
  Type:any;
  imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  editFile: boolean = true;
  removeUpload: boolean = false;
  currentTime:any;
  currentDate:any; 
  locaionPath:any;
  FormValue:any;
  selectedFile: File
  newImage:any;
  imageData:any;
  dateFieldValid = false;
  day:any;
  ADD =false;
  buttonStatus = false;

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private http: HttpClient,
    private bsLocaleService: BsLocaleService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter
  
  ) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.registrationGroup = this.formBuilder.group({
      id:[''],
      email: ["", [Validators.required, Validators.email]],
      currnetJoinDate: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["",  [Validators.required, Validators.minLength(6)]],
      username: ["", Validators.required],
      phonenumber: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      phonenumber1: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      birth: ["", Validators.required],
      nicNumber:['' ,[Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],  
      address: ["", Validators.required],
      description:[''],
      typeName:['',Validators.required],
      tickets: new FormArray([]),
      skills: new FormArray([]),
      education: new FormArray([])
    })
   
    this.loadNewId();
  }

  loadNewId(){

  //Id Gen  
  this.currentTime = moment().format("LT");
  this.currentDate = moment()
      .subtract(10, "days")
      .calendar();
      
  this.registrationGroup.controls["currnetJoinDate"].setValue(
      this.currentDate
    );

    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "SCH_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.registrationGroup.controls["id"].setValue(id);
    }
    this.authenticationService.getAllSchedule()
    .subscribe(
      response=>{
        this.Type = response
       
      }
    )
     }
  
public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  get E() {
    return this.f.education as FormArray;
  }

  get t() {
     return this.f.tickets as FormArray;
     }

  get S() {
    return this.f.skills as FormArray;
  }   
  get f() {
    return this.registrationGroup.controls;
  }

  onKey(event){

    let NICNo  = event.target.value;
   
    var dayText = 0;
    var year = "";
    var month = "";
    var gender = "";
  
      // Year
      if (NICNo.length == 10) {
        year = "19" + NICNo.substr(0, 2);
        dayText = parseInt(NICNo.substr(2, 3));
    
    } else {
        year = NICNo.substr(0, 4);
        dayText = parseInt(NICNo.substr(4, 3));
 
    }
      // Gender
      if (dayText > 500) {
        gender = "Female";
        dayText = dayText - 500;
    } else {
        gender = "Male";
    }
    // Day Digit Validation
    if (dayText < 1 && dayText > 366) {
 
  }else{
     //Month
     if (dayText > 335) {
     this.day = dayText - 335;
      month = "December";
     // console.log(month);
  }
  else if (dayText > 305) {
     this.day = dayText - 305;
      month = "November";
  }
  else if (dayText > 274) {
     this.day = dayText - 274;
      month = "October";
  }
  else if (dayText > 244) {
     this.day = dayText - 244;
      month = "September";
  }
  else if (dayText > 213) {
     this.day = dayText - 213;
      month = "Auguest";
  }
  else if (dayText > 182) {
     this.day = dayText - 182;
      month = "July";
  }
  else if (dayText > 152) {
     this.day = dayText - 152;
      month = "June";
  }
  else if (dayText > 121) {
     this.day = dayText - 121;
      month = "May";
  }
  else if (dayText > 91) {
     this.day = dayText - 91;
      month = "April";
  }
  else if (dayText > 60) {
     this.day = dayText - 60;
      month = "March";
  }
  else if (dayText < 32) {
      month = "January";
     this.day = dayText;
  }
  else if (dayText > 31) {
     this.day = dayText - 31;
      month = "Febuary";
  }
        //show Details;
       
       
        if(this.f.nicNumber.valid){
          this.dateFieldValid = true;
        }else {
          this.dateFieldValid = false;
        }
        let birthday = year+ "-" + month + "-" + this.day
        this.registrationGroup.controls['birth'].setValue(birthday);
        this.registrationGroup.controls['gender'].setValue(gender);
  
  
  }
    
  }

  get deleteRow() {
    return this.registrationGroup.get('tickets') as FormArray
  }
  onClickTicketsRemove(index){
    
    this.t.removeAt(index);
  }
  onClickSkillsRemove(index){
    this.S.removeAt(index);
  }
  onClickEducationRemove(index){

  
    console.log(index);
    this.E.removeAt(index);
  }

  onClickEducation(e){
    this.submitted = false;
    this.E.push(this.formBuilder.group({
      level: ['',Validators.required],
      college: ['',Validators.required],
      passingyear:['',Validators.required],
  }))
  }

//clear all data inside the array;
  emptyAllArrayFields(){
    while ( this.E.length !== 0) {
      this.E.removeAt(0)
    }
    while ( this.t.length !== 0) {
      this.t.removeAt(0)
    }
    while (  this.S.length !== 0) {
      this.S.removeAt(0)
    }
  
  }

  onClickTickets(e){
    this.ADD = true;
    this.submitted = false;
    this.t.push(this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      empType:['',Validators.required],
      experinceMonth:['',Validators.required],      
      detail:['']
  }));
  }
  onClickSkills(e){
    this.submitted = false;
    this.S.push(this.formBuilder.group({
      skillName:['', Validators.required]
    }));

  }
  //formarray method
  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                title: ['', Validators.required],
                empType:['',Validators.required],
                startDate:['',Validators.required],
                endDate:['',Validators.required],
                detail:['']
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}
  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.registrationGroup.reset();
    this.t.clear();
}

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
}
  addexperience() {

    const experience = this.formBuilder.group({ 
      title: [],
      company: [],
      employmentType: [],
      description:[]
    })
  
    this.t.push(experience);
  }


  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  
  uploadFile(event) {


    const fileEvnet = event.target.files[0];
    if(fileEvnet){
      this.buttonStatus = true;
    }
    console.log(fileEvnet);
    this.newImage = fileEvnet;
 
    const uploadData = new FormData();
    let fileItem = this.uploader.queue;
    // uploadData.append('file', fileItem);
    this.imageData = event.value;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


onSubmit() {
 
  //define two relevent objects


let UserData = {
    user_id: this.f.id.value,
    username: this.f.username.value,
    firstName: this.f.username.value,
    role: "Instructor",
    email: this.f.email.value,
    nicNumber:this.f.nicNumber.value,
    active: true,
    password: this.f.password.value
}

  let instructordata = {
    isId : this.f.id.value,
    email:this.f.email.value,
    firstName:this.f.firstName.value,
    joinDate:this.f.currnetJoinDate.value,
    lastName:this.f.lastName.value,
    username:this.f.username.value,
    phonenumber:this.f.phonenumber.value,
    phonenumber1:this.f.phonenumber1.value,
    birth:this.f.birth.value,
    address:this.f.address.value,
    description:this.f.description.value,
    typeName:this.f.typeName.value,     
    nicNumber:this.f.nicNumber.value,
    image: this.imageUrl,
    role: 'Instructor',
    active: true,
    experince:this.f.tickets.value,
    skils:this.f.skills.value,
    education:this.f.education.value
}

this.submitted= true;
const formData = new FormData();
formData.append('file',  this.newImage);
if(this.registrationGroup.valid && (this.imageUrl !== '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png')){
 const postsImage =  this.uploadImage(formData , this.f.id.value);
 const saveInstrutor = this.authenticationService.saveInstrutor(instructordata ,UserData);

 forkJoin([postsImage , saveInstrutor])
 .subscribe(
   result=>{
     console.log(result[1]);
     if(result[1] == 1){
    this.imageUrl = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
    Swal.fire({
      text: 'Instructor Registered successfully',
      icon: 'success'
    });
  this.submitted = false;
  this.registrationGroup.reset();
  this.emptyAllArrayFields();
  this.loadNewId();
  }else {
    if(result[1].length ==1){
      Swal.fire('Oops...', `${result[1][0]} Already inserted `, 'error');
    }else if(result[1].length ==2)
{
  Swal.fire('Oops...', `${result[1][0]} ,${result[1][1]}  Already inserted `, 'error');
}else if(result[1].length ==3)  {  
  Swal.fire('Oops...', `${result[1][0]} ,${result[1][1]} , ${result[1][2]} Already inserted `, 'error');
}  }
   }
 )
}else {
  Swal.fire('Oops...', `${AlertMessages.ERRORMESSAGEFORFORMVALIDATION}`, 'error');
}
  }

funcA(response1){
    this.registrationGroup.reset();
    this.loadNewId();
    console.log("Hello")
     console.log(response1);
   
   }
   
  uploadImage(data:FormData ,uniqueId): Observable<any> {
    // tslint:disable-next-line:no-debugger
 // alert("This is the "+ data);
    return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
    

  }

}
