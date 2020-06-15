
import { MembershipService } from './../../services/membership.service';
import { states ,periodArray } from './../../_models/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AuthenticationService } from "./../../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { User, UserRegistrationStatus } from "src/app/_models";
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { membershipPeriodType ,NicCheck, AlertMessages } from 'src/app/_models/schedule-status';
import { map } from 'rxjs/operators';
import { usernameStrengthVaidate } from 'src/app/_models/usernamValidation';

@Component({
  selector: "app-getmembership",
  templateUrl: "./getmembership.component.html",
  styleUrls: ["./getmembership.component.scss"]
})
export class GetmembershipComponent implements OnInit {
  getMembershipGroup: FormGroup;

  states =states;
  peridType : any;
  periodArray = periodArray;
  indexId :any;
  usernameValue :any;

  display = [{
    "id": "Yes"
  },
  {
    "id": "No"
  }]

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  submitted = false;
  loading = false;
  dateFieldValid = false;
  BMIField = false;
  disaster = false;
  alertDisplay = false;
  error = "";
  showMsg = false;
  currentTime: any;
  day: any;
  currentDate: any;
  Type: any;
  currentTypeArray = [];
  ArrayValueType = [];
  userID :any;

  valueType: any;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationSercive: AuthenticationService,
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
    this.getMembershipGroup = this.formBuilder.group({
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
      age:['' ,Validators.required],
      currnetJoinDate: [""],
      typeName: ["", Validators.required],
      amount: [""],
      VMonth: [""],
      endDate: [""],
      BMI: [''],
      nicNumber: ['', [Validators.required, Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      noteDisaster: ['']
    });

    this.loadData();
    this.loadFormData();
    this.assignValus();
  }
  dayToDayMembership() {
   
  }
  assignValus() {
    const currentRole = this.currentUserSubject.value.role;

    if(currentRole == 'Member' || currentRole=='Membership'){
      this.getMembershipGroup.controls["email"].setValue(
        this.currentUserSubject.value.email
      );
   this.getMembershipGroup.controls["nicNumber"].setValue(
        this.currentUserSubject.value.nicNumber
      );
      this.getMembershipGroup.controls["firstName"].setValue(
        this.currentUserSubject.value.firstName
      );
      if(this.currentUserSubject.value.nicNumber != ''){
            this.onKey();
      }

    }
   
  }
  validUsername(){
    const username = this.f.username.value;
    this.membershipService.checkUsernameAvailable(username)
    .subscribe(
      response=>{
        console.log(response);
        if(response ==1){
          Swal.fire('Oops...', 'username is Already inserted', 'error')
        }
      },
      error=>{
        console.log(error);
      }
    )
      return null;

  }

  
  
  opensweetalert()
  {
    Swal.fire({
        text: 'Membership Request success',
        icon: 'success'
      });
  }


  opensweetalertcst(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
    })
  }
  opensweetalertdng(data:any) {

    let recivedMessage = data
  
    Swal.fire('Oops...', `${recivedMessage}`, 'error')
  }


  appearDiscription(event) {
    
    if (this.f.disaster.value == 'Yes') {
      this.disaster = true;
    } else {
      this.disaster = false;
    }

  }


  loadFormData() {
    let memberId = this.currentUserSubject.value.user_id;
    let email = this.currentUserSubject.value.email;
    let firstName = this.currentUserSubject.value.firstName;
    let username = this.currentUserSubject.value.username;
     this.indexId = this.currentUserSubject.value._id;
     this.usernameValue = this.currentUserSubject.value.username;
     this.userID = this.currentUserSubject.value.user_id;
    this.getMembershipGroup.controls["memberId"].setValue(
      memberId
          );
 
          
    //       this.getMembershipGroup.controls["email"].setValue(
    //         email
    //             );
    //             this.getMembershipGroup.controls["firstName"].setValue(
    //               firstName
    //                   );
    //                   this.getMembershipGroup.controls["username"].setValue(
    //                     username
    //                         );
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  loadData() {



    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "M_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.getMembershipGroup.controls["membershipId"].setValue(id);


    }
    let m = moment();
    let DateFormat = m.format('L');
    this.currentTime = moment().format("LT");
    this.currentDate = DateFormat;

    this.getMembershipGroup.controls["currnetJoinDate"].setValue(
      this.currentDate
    );
    
   
   
    //get All membershiptype Data
    this.authenticationSercive.getAllMembershipType().subscribe(
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

  //check there is smillar email were avalible in the database
  CheckUniquenessEmail() {
    const emailAddress = this.f.email.value;
    this.membershipService.checkEmailAvailable(emailAddress)
    .subscribe(
      response=>{
        console.log(response);
        if(response ==1){
          Swal.fire('Oops...', 'Email is Already inserted', 'error')
        }
      },
      error=>{
        console.log(error);
      }
    )

  }
 //check there is smillar username were avalible in the database

  CheckUniquenessUsername(){
    const username = this.f.username.value;
    this.membershipService.checkUsernameAvailable(username)
    .subscribe(
      response=>{
        console.log(response);
        if(response ==1){
          Swal.fire('Oops...', 'username is Already inserted', 'error')
        }
      },
      error=>{
        console.log(error);
      }
    )
  }


  loadAutoGenId(){
       //Id Gen
       var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
       var string_length = 8;
       var id = "M_" + "";
       for (var i = 0; i < string_length; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         id += chars.substring(rnum, rnum + 1);
         this.getMembershipGroup.controls["membershipId"].setValue(id);
   
   
       }
  }
  onKey() {

    let NICNo = this.f.nicNumber.value;
    //console.log(event.target.value);
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
    } else {
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
      console.log(year + "-" + month + "-" + this.day);
      var ageValue = {
        years: '',
        months: '',
        days: ''
        };
        let birthday = year + "-" + month + "-" + this.day;

     this.getAge(birthday); 

      if (this.f.nicNumber.valid) {
        this.dateFieldValid = true;
      } else {
        this.dateFieldValid = false;
      }
   
      this.getMembershipGroup.controls['birth'].setValue(birthday);
      this.getMembershipGroup.controls['gender'].setValue(gender);
    }
   

  }


  getAge(birthday) {

    //get today;
    var now = new Date();
    var yearNow = now.getFullYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    const bornday = new Date(birthday);

    var bornyear =bornday.getFullYear();
    var bornmonth =bornday.getMonth();
    var bornNow =bornday.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
    var yearAge = yearNow - bornyear;
    this.getMembershipGroup.controls['age'].setValue(yearAge);

    if (monthNow >= bornmonth)
    var monthAge = monthNow - bornmonth;
  else {
    yearAge--;
    var monthAge = 12 + monthNow -bornmonth;
  }

  if (dateNow >= bornNow)
    var dateAge = dateNow - bornNow;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - bornNow;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
   age = {
    years: yearAge,
    months: monthAge,
    days: dateAge
    };
    

    console.log(age)

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
      this.getMembershipGroup.controls['BMI'].setValue(BMI);
    } else {
      this.BMIField = false;
    }



  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

//Membership Type dropdownchange

  displayAmount(event) {
  //console.log(data.value);
  const membershipName = event.value;
  let dm = moment();
    let month = "";
    const date1 = new Date(this.f.currnetJoinDate.value);
    this.membershipService.getMembershipttypeData(membershipName)
    .subscribe(
      response=>{
      
        this.getMembershipGroup.controls['amount'].setValue(response[0].amount);
        this.getMembershipGroup.controls['VMonth'].setValue(response[0].YMDValue);
   
        this.peridType =  response[0].periodType
        const assginValue =this.f.VMonth.value;
        switch(this.peridType) {
          case membershipPeriodType.MONTHTOMONTH:     
            const withmonths = dm.add(assginValue, 'months')
            let todayDate = withmonths.format('L');
            this.getMembershipGroup.controls['endDate'].setValue(todayDate);
            break;
            case membershipPeriodType.YEARTOYEAR:
              const withYears = dm.add(assginValue, 'years');
              let years = withYears.format('L');
              this.getMembershipGroup.controls['endDate'].setValue(years);
            break;
              case membershipPeriodType.DAYTODAY:
                const withDays = dm.add(assginValue, 'days');
                let days = withDays.format('L');
                this.getMembershipGroup.controls['endDate'].setValue(days);
                break;
        }
      }
    )
    let todayDate = dm.format('L');

      if(this.valueType !=='Choose'){
      
    }else{
      this.getMembershipGroup.controls["amount"].setValue("");
      this.getMembershipGroup.controls["VMonth"].setValue("");
      this.getMembershipGroup.controls['endDate'].setValue("")
    }
  }
  get f() {
    return this.getMembershipGroup.controls;
  }



  onSubmit() {

  
    this.submitted = true;
    this.loading = true;

    let memberShipDetials = {
      membershipId:  this.userID,
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
      age:this.f.age.value,
      BMI: this.f.BMI.value,
      currnetJoinDate: this.f.currnetJoinDate.value,
      typeName: this.f.typeName.value,
      amount: this.f.amount.value,
      VMonth: this.f.VMonth.value,
      endDate: this.f.endDate.value,
      status: false,
      nicNumber: this.f.nicNumber.value,
      role: "Membership",
      noteDisaster: this.f.noteDisaster.value

    };
    console.log(memberShipDetials)
    let UserData = {
      _id : this.indexId,
      user_id: this.userID,
      username: this.usernameValue,
      firstName: this.usernameValue,
      role: "Member",
      email: this.f.email.value,
      membershipStatus: 'false',
      active: true,
      
    };
    console.log(UserData)
    
    if (this.getMembershipGroup.valid) {
      this.authenticationSercive.saveInsertMembershipDetails(memberShipDetials, UserData)
        .subscribe(
          response => {
              if(UserRegistrationStatus.SUCCESS == response){
              this.opensweetalert();
              this.submitted = false;
              this.getMembershipGroup.reset();
              this.loadAutoGenId();     
            }else if(response == UserRegistrationStatus.DUPLICATEID){
              console.log('HI heo helo')
              this.opensweetalertdng(AlertMessages.DUPLICATEIDMEMBERSHIP);
            }
          },
          error=>{
            console.log(error);
          }
        );
          }else {
          
            this.opensweetalertdng(AlertMessages.ERRORMESSAGEFORFORMVALIDATION);
          }



        }
    
  
}
