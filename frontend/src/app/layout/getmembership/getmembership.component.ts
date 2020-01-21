import { AuthenticationService } from "./../../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/_models";

@Component({
  selector: "app-getmembership",
  templateUrl: "./getmembership.component.html",
  styleUrls: ["./getmembership.component.scss"]
})
export class GetmembershipComponent implements OnInit {
  getMembershipGroup: FormGroup;
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
  error = "";

  currentTime: any;
  day: any;
  currentDate: any;
  Type: any;
  currentTypeArray = [];
  ArrayValueType = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationSercive: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
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
      password: ["", [Validators.required, Validators.minLength(6)]],
      username: ["", Validators.required],
      phonenumber: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      phonenumber1: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      Height: ["", Validators.required],
      Weight: ["", Validators.required],
      birth: ["", Validators.required],

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
      confirmPassword: ['', Validators.required],
      noteDisaster: ['']
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      });
    this.loadData();

    this.loadFormData();
  }

  appearDiscription(event) {
    //console.log(this.f.disaster.value);
    if (this.f.disaster.value == 'Yes') {
      this.disaster = true;
    } else {
      this.disaster = false;
    }

  }


  loadFormData() {
    let customerId = this.currentUserSubject.value.user_id;
    this.authenticationSercive.findCustomer(customerId)
    .subscribe(
      data=>{
        console.log('data');
        console.log(data);
        this.getMembershipGroup.controls["firstName"].setValue(
          data[0].firstName
        );
        this.getMembershipGroup.controls["lastName"].setValue(
          data[0].lastName
        );
        this.getMembershipGroup.controls["phonenumber"].setValue(
          data[0].phonenumber
        );
        this.getMembershipGroup.controls["username"].setValue(
          data[0].username
        );
        this.getMembershipGroup.controls["email"].setValue(
          data[0].email
        );
        
        this.getMembershipGroup.controls["nicNumber"].setValue(
          data[0].nicNumber
        );
       this.onKey();













      }
    )
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
    //console.log("HHHSDS");
    //console.log(this.currentUserSubject.value);
   
   
    //get All membershiptype Data
    this.authenticationSercive.getAllMembershipType().subscribe(
      response => {
        this.Type = response;
        console.log(this.Type);
        this.currentTypeArray.push(response);

        for (var i = 0; i < this.Type.length; i++) {
          console.log("ARRAY");
          console.log(this.Type[i].typeName);
          this.ArrayValueType.push(this.Type[i].typeName);
        }
        console.log(this.ArrayValueType);
      },
      error => {
        console.log(error);
      }
    );
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
      console.log(gender);
      console.log(year + "-" + month + "-" + this.day);
      if (this.f.nicNumber.valid) {
        this.dateFieldValid = true;
      } else {
        this.dateFieldValid = false;
      }
      let birthday = year + "-" + month + "-" + this.day
      this.getMembershipGroup.controls['birth'].setValue(birthday);
      this.getMembershipGroup.controls['gender'].setValue(gender);


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

  displayAmount(data) {
    //alert(data.value);


    let month = "";
    const date1 = new Date(this.f.currnetJoinDate.value);
    var mm = date1.getMonth() + 2;
    var year = date1.getFullYear();

    for (var i = 0; i < this.Type.length; i++) {
      //console.log(this.Type[0].typeName);
      if (this.Type[i].typeName == data.value) {

        month = this.Type[i].month;
        this.getMembershipGroup.controls["amount"].setValue(this.Type[i].amount);
        this.getMembershipGroup.controls["VMonth"].setValue(this.Type[i].month);


        //SETUP THE ENDDATE
        let dm = moment();
        let todayDate = dm.format('L');
        let MonthAsNumber = Number(month);
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        for (var x = 0; x < arr.length; x++) {
          if (MonthAsNumber == arr[x]) {
            // alert(MonthAsNumber);
            let addDays = dm.add(MonthAsNumber, 'months');
            let convertDate = addDays.format('L');

            this.getMembershipGroup.controls['endDate'].setValue(convertDate);
            return;
          } else {

          }
        }

      } else if ("Choose..." == data.value) {
        this.getMembershipGroup.controls["amount"].setValue("");
        this.getMembershipGroup.controls["VMonth"].setValue("");
        this.getMembershipGroup.controls['endDate'].setValue("")
        //return
      }
    }
  }
  get f() {
    return this.getMembershipGroup.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.loading = true;

    let memberShipDetials = {
      membershipId: this.f.membershipId.value,
      email: this.f.email.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      password: this.f.password.value,
      username: this.f.username.value,
      phonenumber: this.f.phonenumber.value,
      phonenumber1: this.f.phonenumber1.value,
      Height: Number(this.f.Height.value),
      Weight: Number(this.f.Weight.value),
      disaster: this.f.disaster.value,
      birth: this.f.birth.value,

      description: this.f.description.value,

      gender: this.f.gender.value,
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
    let UserData = {
      user_id: this.f.membershipId.value,
      username: this.f.username.value,
      firstName: this.f.username.value,
      role: "Membership",
      email: this.f.email.value,
      active: false,
      password: this.f.password.value
    };

   
    if (this.getMembershipGroup.valid) {
      console.log(memberShipDetials);
      this.authenticationSercive
        .saveInsertMembershipDetails(memberShipDetials, UserData)
        .subscribe(
          response => {console.log('response');
            console.log(response);       
            this.submitted = false;  
            this.getMembershipGroup.reset();
            this.loadAutoGenId();
          }
        );
    }

  }
}
