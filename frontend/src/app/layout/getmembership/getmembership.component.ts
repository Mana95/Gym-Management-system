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

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  submitted = false;
  loading = false;
  error = "";

  currentTime: any;
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
      password: ["",  [Validators.required, Validators.minLength(6)]],
      username: ["", Validators.required],
      phonenumber: ["", [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      phonenumber1: ["", [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      Height: ["", Validators.required],
      Weight: ["", Validators.required],
      birth: ["", Validators.required],
      address: ["", Validators.required],
      disaster:['',Validators.required],
      description: [""],
      gender:['',Validators.required],
      age: ["", Validators.required],
      currnetJoinDate: [""],
      typeName: ["", Validators.required],
      amount: [""],
      VMonth: [""],
      endDate: [""]
    });
    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "M_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.getMembershipGroup.controls["membershipId"].setValue(id);

      this.currentTime = moment().format("LT");
      this.currentDate = moment()
        .subtract(10, "days")
        .calendar();
      this.getMembershipGroup.controls["currnetJoinDate"].setValue(
        this.currentDate
      );
    }
    console.log("HHHSDS");
    console.log(this.currentUserSubject.value);
    this.getMembershipGroup.controls["firstName"].setValue(
      this.currentUserSubject.value.firstName
    );
    this.getMembershipGroup.controls["lastName"].setValue(
      this.currentUserSubject.value.lastName
    );
    this.getMembershipGroup.controls["phonenumber"].setValue(
      this.currentUserSubject.value.mobileNumber
    );
    this.getMembershipGroup.controls["username"].setValue(
      this.currentUserSubject.value.username
    );
    this.getMembershipGroup.controls["email"].setValue(
      this.currentUserSubject.value.email
    );
    this.getMembershipGroup.controls["address"].setValue(
      this.currentUserSubject.value.address
    );

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


  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  displayAmount(data) {
   // alert(data.value);
    let arr = [
      "1 Month",
      "2 Month",
      "3 Month",
      "4 Month",
      "5 Month",
      "6 Month",
      "7 Month",
      "8 Month",
      "9 Month",
      "10 Month",
      "11 Month",
      "12 Month"
    ];

    let month = "";
    const date1 = new Date(this.f.currnetJoinDate.value);
    var mm = date1.getMonth() + 2;
    var year = date1.getFullYear();

    for (var i = 0; i < this.Type.length; i++) {
      //console.log(this.Type[0].typeName);
      if (this.Type[i].typeName == data.value) {
        console.log("Hello" + i);
        console.log(this.Type[i].typeName);
        month = this.Type[i].month;
        this.getMembershipGroup.controls["amount"].setValue(
          this.Type[i].amount
        );
        this.getMembershipGroup.controls["VMonth"].setValue(
          this.Type[i].month
        );
        for (var i = 0; i < arr.length; i++) {
          if (month == arr[i]) {
        //    alert(month);
            let monthVal = i + 1;
            var mm = date1.getMonth() + 1 + monthVal;
            if (mm >= 13) {
              mm -= 12;
              year += 1;
              //alert(year)
              var NewDate =
                mm + "/" + (date1.getDate() - 1) + "/" + year;
              this.getMembershipGroup.controls[
                "endDate"
              ].setValue(NewDate);
            } else {
              var NewDate =
                mm + "/" + (date1.getDate() - 1) + "/" + year;
              this.getMembershipGroup.controls[
                "endDate"
              ].setValue(NewDate);
            }
          }
        }
      } else if ("Choose..." == data.value) {
        this.getMembershipGroup.controls["amount"].setValue("");
        this.getMembershipGroup.controls["VMonth"].setValue("");
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
      disaster:this.f.disaster.value,
      birth: this.f.birth.value,
      address: this.f.address.value,
      description: this.f.description.value,
      age: this.f.age.value,
      gender:this.f.gender.value,
      currnetJoinDate: this.f.currnetJoinDate.value,
      typeName: this.f.typeName.value,
      amount: this.f.amount.value,
      VMonth: this.f.VMonth.value,
      endDate: this.f.endDate.value,
      status: false,
      role: "Membership"
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

    console.log(memberShipDetials);
    if(this.getMembershipGroup.valid){
      this.authenticationSercive
      .saveInsertMembershipDetails(memberShipDetials , UserData)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('Done');
          this.submitted = false;
          this.getMembershipGroup.reset();

        }
      );
    }
 
  }
}
