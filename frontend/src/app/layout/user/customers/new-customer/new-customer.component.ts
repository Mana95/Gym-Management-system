import { PasswordStrengthValidator } from './../../../../_models/password-strength.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserRegistrationStatus, User } from 'src/app/_models/user';
import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from "moment";
import { membershipPeriodType } from 'src/app/_models/schedule-status';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  MembershipGroup:FormGroup;
  submitted = false;
  loading = false;
  error = '';
  userID : any;
  active = false;
  customerData = false;
  errorValue: any;
  day:any;
  dateFieldValid = false;
  Type: any;
  currentTime: any;
  currentDate: any;
  showMsg = false;
  indexId :any;
  usernameValue :any;
  peridType : any;
  valueType: any;
  BMIField = false;
  disaster = false;
  alertDisplay = false;
  display = [{
    "id": "Yes"
  },
  {
    "id": "No"
  }]

  currentTypeArray = [];
  ArrayValueType = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private membershipService : MembershipService
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
   this.MembershipGroup = this.formBuilder.group({

   membershipId: ["", Validators.required],
   email: ["", [Validators.required, Validators.email]],
   firstName: ["", Validators.required],
   lastName: ["", Validators.required],
   phonenumber: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
   phonenumber1: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
   Height: ["", Validators.required],
   Weight: ["", Validators.required],
   birth: ["", Validators.required],
   memberId:[''],
   disaster: ['', Validators.required],
   description: [""],
   gender: ['', Validators.required],
   currnetJoinDate: [""],
   typeName: ["", Validators.required],
   amount: [""],
   VMonth: [""],
   endDate: [""],
   BMI: [''],
   nicNumber: ['', [Validators.required, Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
   noteDisaster: [''],
   password:['',Validators.required],
   
    

   }) 

  
  


  this.loadData();
  this.loadFormData();
 
  }


  
  appearDiscription(event) {
    
    if (this.f.disaster.value == 'Yes') {
      this.disaster = true;
    } else {
      this.disaster = false;
    }

  }
  bmiCalculator(this) {

    var weight = Number(this.f.Height.value);
    var height = Number(this.f.Weight.value);
    var finalWeight = weight * .45;
    var finalHeight = height * .025;


    var BMI = (finalWeight / Math.pow(finalHeight, 2)).toFixed(2);;
    console.log(BMI);
    let DecimalPoint = Number(BMI);
    let Data = parseFloat("DecimalPoint").toFixed(2);
    if (weight && height) {
      this.BMIField = true;
      this.MembershipGroup.controls['BMI'].setValue(BMI);
    } else {
      this.BMIField = false;
    }



  }

  loadFormData() {
    ///let memberId = this.currentUserSubject.value.user_id;
    let email = this.currentUserSubject.value.email;
    let firstName = this.currentUserSubject.value.firstName;
    let username = this.currentUserSubject.value.username;
     this.indexId = this.currentUserSubject.value._id;
     this.usernameValue = this.currentUserSubject.value.username;
   //  this.userID = this.currentUserSubject.value.user_id;
  
 
        
  }
  displayAmount(event) {
    //console.log(data.value);
    const membershipName = event.value;
    let dm = moment();
      let month = "";
      const date1 = new Date(this.f.currnetJoinDate.value);
      this.membershipService.getMembershipttypeData(membershipName)
      .subscribe(
        response=>{
        
          this.MembershipGroup.controls['amount'].setValue(response[0].amount);
          this.MembershipGroup.controls['VMonth'].setValue(response[0].YMDValue);
     
          this.peridType =  response[0].periodType
          const assginValue =this.f.VMonth.value;
          switch(this.peridType) {
            case membershipPeriodType.MONTHTOMONTH:     
              const withmonths = dm.add(assginValue, 'months')
              let todayDate = withmonths.format('L');
              this.MembershipGroup.controls['endDate'].setValue(todayDate);
              break;
              case membershipPeriodType.YEARTOYEAR:
                const withYears = dm.add(assginValue, 'years');
                let years = withYears.format('L');
                this.MembershipGroup.controls['endDate'].setValue(years);
              break;
                case membershipPeriodType.DAYTODAY:
                  const withDays = dm.add(assginValue, 'days');
                  let days = withDays.format('L');
                  this.MembershipGroup.controls['endDate'].setValue(days);
                  break;
          }
        }
      )
      let todayDate = dm.format('L');
  
        if(this.valueType !=='Choose'){
        
      }else{
        this.MembershipGroup.controls["amount"].setValue("");
        this.MembershipGroup.controls["VMonth"].setValue("");
        this.MembershipGroup.controls['endDate'].setValue("")
      }
    }
  loadData() {

    
         

    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "M_" + "";
    var memberId = "M_"+"";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.MembershipGroup.controls["membershipId"].setValue(id);
      

    }
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      memberId += chars.substring(rnum, rnum + 1);
     
      

    }

    this.MembershipGroup.controls["memberId"].setValue(
      memberId);
    let m = moment();
    let DateFormat = m.format('L');
    this.currentTime = moment().format("LT");
    this.currentDate = DateFormat;

    this.MembershipGroup.controls["currnetJoinDate"].setValue(
      this.currentDate
    );
    
   
   
    //get All membershiptype Data
    this.authenticationService.getAllMembershipType().subscribe(
      response => {
        this.Type = response; 
        this.currentTypeArray.push(response);
        for (var i = 0; i < this.Type.length; i++) {        
          this.ArrayValueType.push(this.Type[i].membershipName);
        }
      
      }, 
      error => {
        console.log(error);
      }
    );
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
      //  console.log(year);
       // console.log(dayText);
    } else {
        year = NICNo.substr(0, 4);
        dayText = parseInt(NICNo.substr(4, 3));
      //  console.log(year);
     //   console.log(dayText);
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
  console.log("Invalid ID");
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
        this.MembershipGroup.controls['birth'].setValue(birthday);
        this.MembershipGroup.controls['gender'].setValue(gender);
  
  
  }
    
  }

  get f() {

    return this.MembershipGroup.controls;

  }

  //validation the phone number
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;


    let cus_data = {
      membershipId:  this.f.membershipId.value,
      email: this.f.email.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      username: this.usernameValue,
      phonenumber: this.f.phonenumber.value,
      phonenumber1: this.f.phonenumber1.value,
      Height: Number(this.f.Height.value),
      Weight: Number(this.f.Weight.value),
      disaster: this.f.disaster.value,
      birth: this.f.birth.value,
      customerID : this.f.memberId.value,
      description: this.f.description.value,
      gender: this.f.gender.value,
      BMI: this.f.BMI.value,
      currnetJoinDate: this.f.currnetJoinDate.value,
      typeName: this.f.typeName.value,
      amount: this.f.amount.value,
      VMonth: this.f.VMonth.value,
      endDate: this.f.endDate.value,
      status: true,
      nicNumber: this.f.nicNumber.value,
      role: "Membership",
      noteDisaster: this.f.noteDisaster.value

    }

    let userParam = {
      user_id:  this.f.memberId.value,
      nicNumber:this.f.nicNumber.value,
      username: this.usernameValue,
      firstName: this.usernameValue,
      password:this.f.password.value,
      role: "Membership",
      email: this.f.email.value,
      membershipStatus: 'true',
      active: true,
  }
  
    if(this.MembershipGroup.valid){
      ///alert('Valid');
      this.authenticationService.registerCustomer(cus_data ,userParam)
      .subscribe(
        response=>{
          if(response==1){
            Swal.fire({
              text: 'Membership Registered success',
              icon: 'success'
            });
            this.MembershipGroup.reset();
            this.loadData();
            this.submitted = false;
          
          }else{
            Swal.fire('Oops...',`${response[0]} ,${response[1]} is Already inserted`, 'error')
          }

        },
        error=>{
         
        },
        ()=>{
          console.log("Done");

        } );
       
        


    }

  }

}
