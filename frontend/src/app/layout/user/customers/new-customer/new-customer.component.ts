import { PasswordStrengthValidator } from './../../../../_models/password-strength.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserRegistrationStatus } from 'src/app/_models/user';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  cusRegister:FormGroup;
  submitted = false;
  loading = false;
  error = '';
  userId : any;
  active = false;
  customerData = false;
  errorValue: any;
  day:any;
  dateFieldValid = false;


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   this.cusRegister = this.formBuilder.group({
    id:[''],
    firstName: ['', Validators.required],
    gender: ['' , Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    nicNumber:['',[Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
    // password: ['', [Validators.required, PasswordStrengthValidator]],
    phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
    emergencyNumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
    username:['',Validators.required],
    description:['',  Validators.required],
    email: ['', [Validators.required, Validators.email]],
    

   }) 

  
  


  this.loadId();
 
  }


  loadId() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'CUS_'+'';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum,rnum+1);
      this.cusRegister.controls['id'].setValue(id);
  }
  }

  onKey(event){

    let NICNo  = event.target.value;
    console.log(event.target.value);
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
        console.log(gender);
        console.log(year+ "-" + month + "-" + this.day);
        if(this.f.nicNumber.valid){
          this.dateFieldValid = true;
        }else {
          this.dateFieldValid = false;
        }
        let birthday = year+ "-" + month + "-" + this.day
       
        this.cusRegister.controls['gender'].setValue(gender);
  
  
  }
    
  }

  get f() {

    return this.cusRegister.controls;

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
      id: this.f.id.value,
      firstName: this.f.firstName.value,
      lastName:this.f.lastName.value,
      gender: this.f.gender.value,
      address:this.f.address.value ,
      password: this.f.nicNumber.value,
      username : this.f.username.value,
      phonenumber:this.f.phonenumber.value,
      emergencyNumber:this.f.emergencyNumber.value,
      description:this.f.description.value,
      role:'Customer',
      nicNumber: this.f.nicNumber.value,
      email:this.f.email.value,
      active : true
    }

    let userParam = {
      "user_id": this.f.id.value,
      "firstName": this.f.firstName.value ,
       "lastName": this.f.lastName.value ,
       "username" : this.f.username.value,
       "password": this.f.nicNumber.value,
       "mobileNumber":this.f.phonenumber.value,
       "description": this.f.description.value,
        "email": this.f.email.value,
        "address":this.f.address.value,
        "role": "Customer",
        "active" : true
  }
  


    console.log(cus_data)
    if(this.cusRegister.valid){

//alert('hi');
      this.authenticationService.register(userParam)
      .subscribe(
          data=> {
              console.log('data');
              console.log(data);
              this.customerData = true;
             
              if(data == UserRegistrationStatus.DUPLICATEUSER ){
                  this.active = true;
                  this.errorValue = 'User Name is available';
                  console.log(this.errorValue);
              }
          },
          error => {
              console.log('error');
              console.log(error)
              this.loading = false;      
          },
          () =>{
            console.log('Done');
            this.submitted = false;
         
        this.cusRegister.reset();
        this.loadId();
          }
          
      );

      ///alert('Valid');
      this.authenticationService.registerCustomer(cus_data)
      .subscribe(
        response=>{
         // console.log('RESPONSE');
          console.log(response);

        },
        error=>{
          console.log(error);
          this.error = error;
          this.loading = false;
        },
        ()=>{
          console.log("Done");
          this.submitted = false;
          this.cusRegister.reset();
          this.loadId();
        } );
        alert("Register succeeded");
        


    }

  }

}
