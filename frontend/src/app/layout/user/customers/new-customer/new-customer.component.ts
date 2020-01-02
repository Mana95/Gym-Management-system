import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   this.cusRegister = this.formBuilder.group({
    firstName: ['', Validators.required],
    age: ['' , Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phonenumber: ['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
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
      age: this.f.age.value,
      address:this.f.address.value ,
      phonenumber:this.f.phonenumber.value,
      description:this.f.description.value,
      role:'Customer',
      email:this.f.email.value
    }
    console.log(cus_data)
    if(this.cusRegister.valid){
      ///alert('Valid');
      this.authenticationService.registerCustomer(cus_data)
      .subscribe(
        response=>{
          console.log('RESPONSE');
          console.log(response);

        },
        error=>{
          console.log(error);
          this.error = error;
          this.loading = false;
        } );
        alert("Register succeeded");
        this.submitted = false;
  
        this.cusRegister.reset();


    }

  }

}
