import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-suppliers',
  templateUrl: './new-suppliers.component.html',
  styleUrls: ['./new-suppliers.component.scss']
})
export class NewSuppliersComponent implements OnInit {
  supRegister:FormGroup;
  submitted = false;
  loading = false;
  error = '';
  userId : any;
  
  constructor( 
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.supRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      age: ['' , Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      description:['',  Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'SUP_'+'';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum,rnum+1);
      this.userId = id;

    }
  }

  //formconctroller
  get f() {

    return this.supRegister.controls;

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
     let sup_data = {
      sup_id: userID.value,
      sup_firstName: this.f.firstName.value,
      sup_lastName:this.f.lastName.value,
      sup_age: this.f.age.value,
      sup_address:this.f.address.value ,
      sup_phonenumber:this.f.phonenumber.value,
      sup_description:this.f.description.value,
      sup_email:this.f.email.value
    }
    console.log(sup_data)
    if(this.supRegister.valid){
      ///alert('Valid');
      this.authenticationService.registerSupplier(sup_data)
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
  
        this.supRegister.reset();

    }
    else {
      alert("Fields are not required");
    }

  }



}
