import { AuthenticationService } from './../services/authentication.service';
import { User, UserRegistrationStatus } from './../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {


registerForm : FormGroup;
   //Decalre the variables
   active = false;
   submitted = false;   
   loading = false;
   errorValue: any;
error:'';
currentUser : User;
userId: any;
cusId : any;
customerData = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService

    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address:['',Validators.required],
            phonenumber:['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
            email:['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            description: [''],
            confirmPassword: ['', Validators.required]
        },
        {
            validator: this.MustMatch('password', 'confirmPassword')
        });



          //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'U_' + '';
    var cusId = 'CUS_'+'';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.userId = id;

    }
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        cusId += chars.substring(rnum, rnum + 1);
        this.cusId = cusId;
  
      }


    }
    

    //validation the phone number
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }


    //Matching the pW

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

    setInactive() {
    //  console.log('sd')
        this.active = false;
    }
//controlling the register
get f() {
    return this.registerForm.controls;
}

onSubmit(userID) {
    this.submitted = true;
    this.loading = true;
//alert("This is the Submit Form");
let idData = this.userId;
let cusId = this.cusId;
//console.log(idData);

let cusParam = {
    "id": cusId,
    "user_id": idData,
    "firstName": this.f.firstName.value ,
     "lastName": this.f.lastName.value ,
     "username" : this.f.firstName.value,
     "password": this.f.password.value,
     "phonenumber":this.f.phonenumber.value,
     "description": this.f.description.value,
      "email": this.f.email.value,
      "address":this.f.address.value,
      "role": "Customer",
      "active" : "true"

}
//console.log(cusParam)
//main table is user
let userParam = {
    "user_id": idData,
    "firstName": this.f.firstName.value ,
     "lastName": this.f.lastName.value ,
     "username" : this.f.firstName.value,
     "password": this.f.password.value,
     "mobileNumber":this.f.phonenumber.value,
     "description": this.f.description.value,
      "email": this.f.email.value,
      "address":this.f.address.value,
      "role": "Customer",
      "active" : "true"
}





//console.log(cusParam)

if(this.registerForm.valid){
//inserting to the user table
this.authenticationService.register(userParam)
.subscribe(
    data=> {
        this.customerData = true;
       
        if(data == UserRegistrationStatus.DUPLICATEUSER ){
            this.active = true;
            this.errorValue = 'Email is available';
          console.log(this.errorValue);
        }
    },
    error => {
     //   console.log('error');
        console.log(error)
        this.loading = false;
       
    }
    
);

if(!this.customerData) {

this.authenticationService.userCreation(cusParam)
        .subscribe(data => {
          console.log(data);
        },
          error => {
            this.error = error;
            this.loading = false;

          });

        }
this.submitted = false;
//this.loading = false;
  
this.registerForm.reset();




 }
}
}
