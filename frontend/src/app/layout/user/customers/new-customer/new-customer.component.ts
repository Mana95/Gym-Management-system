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


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   this.cusRegister = this.formBuilder.group({
    firstName: ['', Validators.required],
    gender: ['' , Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    address2:[''],
    password: ['', [Validators.required, PasswordStrengthValidator]],
    phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
    emergencyNumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
    username:['',Validators.required],
    
    description:['',  Validators.required],
    email: ['', [Validators.required, Validators.email]],
    

   }) 

   var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'CUS_'+'';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum,rnum+1);
      this.userId = id;
  }
  
  console.log(id);
 
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

  onSubmit(userID) {
    this.submitted = true;
    this.loading = true;


    let cus_data = {
      id: userID.value,
      firstName: this.f.firstName.value,
      lastName:this.f.lastName.value,
      gender: this.f.gender.value,
      address:this.f.address.value ,
      address2:this.f.address2.value ,
      password: this.f.password.value,
      username : this.f.username.value,
      phonenumber:this.f.phonenumber.value,
      description:this.f.description.value,
      role:'Customer',
      email:this.f.email.value,
      active : true
    }

    let userParam = {
      "user_id": userID.value,
      "firstName": this.f.firstName.value ,
       "lastName": this.f.lastName.value ,
       "username" : this.f.username.value,
       "password": this.f.password.value,
       "mobileNumber":this.f.phonenumber.value,
       "description": this.f.description.value,
        "email": this.f.email.value,
        "address":this.f.address.value,
        "role": "Customer",
        "active" : true
  }
  


    console.log(cus_data)
    if(this.cusRegister.valid){


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
          console.log("Done")
        } );
        alert("Register succeeded");
        


    }

  }

}
