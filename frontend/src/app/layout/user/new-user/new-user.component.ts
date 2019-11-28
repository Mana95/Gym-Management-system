import { User } from './../../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',

  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userRegisterFrom: FormGroup;
  userRole :any
  submitted = false;
  loading = false;
  error = '';
  userId : any;
  @Input() isChecked = false;
  user = new User();
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.user.active = false;
     

    let id = 'U_' + Math.random().toString(36).substr(4, 5);
    this.userId = id;
    this.authenticationService.getAllRole()
    .subscribe(data => {
      this.userRole = data;
      console.log(data)
    },error=> {
      this.error = error;
      this.loading = false;
    })
    
    this.userRegisterFrom = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      username: ['' , Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      assignRole: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      description: ['', Validators.required],
      active: ['false']
    })
  }
  //
  get f() {

    return this.userRegisterFrom.controls;

  }

  onItemChange(event) {
    alert(event.value);
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
    console.log(this.f.active.value);
    let UserCreationParam = {

      "userId": userID.value,
      "email": this.f.email.value,
      "firstName": this.f.firstName.value,
      "username" : this.f.username.value,
      "lastName": this.f.lastName.value,
      "password": this.f.password.value,
      "mobileNumber": this.f.phonenumber.value,
      "role": this.f.assignRole.value,
      "address": this.f.address.value,
      "city": this.f.city.value,
      "state": this.f.state.value,
      "zip": this.f.zip.value,
      "description": this.f.description.value,
      "active": this.f.active.value


    };
    console.log(JSON.stringify(UserCreationParam));
    if (this.userRegisterFrom.valid) {

      this.authenticationService.userCreation(UserCreationParam)
        .subscribe(data => {
          console.log(data);
        },
          error => {
            this.error = error;
            this.loading = false;

          });
      alert("Register succeeded");
      this.submitted = false;

      this.userRegisterFrom.reset();
    } else {
      alert("Please check the Fields");
    }
  }


  checkBoxValue(data) {
  alert(data.value);

  }
}
