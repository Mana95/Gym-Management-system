import { User } from './../../../_models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  formData : User;
  userRole:any;

  id:any;
  activeStatus: '';
  emailValue: any;
  viewForm:FormGroup;
  loading = false;
   error = '';
   submitted = false;

   user = new User();
   valueUser : any;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.id =  this.id = (this.route.snapshot.paramMap.get('userid'));
    console.log(this.id);
    this.authenticationService.getById(this.id)
    .subscribe(
      data => {
        console.log(data);
        this.valueUser = data;
        this.user = this.valueUser
        console.log('Define' +this.user)
    
      }   
    )
    this.authenticationService.getAllRole()
    .subscribe(data => {
      this.userRole = data;
      console.log(data)
    },error=> {
      this.error = error;
      this.loading = false;
    })

  }

  get f() {

    return this.viewForm.controls;

  }

  updateRecords(data1, data2) {
    alert("This is the submit button method"+ this.f.userId)
;
var id = 'PO' + Math.random().toString(36).substr(2, 9);
var PO_id ='-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
console.log(id)
console.log(PO_id);
  }

  onSubmit() {


let editUserDetails = {
  "uniqueId" : this.user._id,
  "userId": this.user.userId,
  "email": this.user.email,
  "firstName": this.user.firstName,
  "lastName":this.user.lastName,
  "mobileNumber":this.user.mobileNumber,
  "assignRole": this.user.assignRole,
  "address": this.user.address,
  "city": this.user.city,
  "state": this.user.state,
  "zip": this.user.zip,
  "description":this.user.description,
  "active": this.user.active
}
this.authenticationService.updateUser(editUserDetails)
.subscribe(data => {
  
  console.log(data);
  this.openConfirmationDialog();
},error=> {
  this.error = error;
  this.loading = false;
})


    console.log("Update"+JSON.stringify(editUserDetails));   

}

openConfirmationDialog() {

}


}
