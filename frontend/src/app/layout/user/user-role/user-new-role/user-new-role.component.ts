import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-new-role',
  templateUrl: './user-new-role.component.html',
  styleUrls: ['./user-new-role.component.scss']
})

export class UserNewRoleComponent implements OnInit {
  roleRegisterForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  group_Name: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authenticationService.getGroupName()
    .subscribe(
      res=>{
        console.log(res);
        this.group_Name = res;
      }
    )

    this.roleRegisterForm = this.formBuilder.group({
      roleID: ['', Validators.required],
      roleName: ['', Validators.required],
      description: ['', Validators.required],
      groupName:['', Validators.required]
    })
  }

  get roleF() {
    return this.roleRegisterForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    this.loading = true;
    
    let UserRole = {
      // "_id" :this.roleF.roleName.value,
      "roleID": this.roleF.roleID.value,
      "roleName": this.roleF.roleName.value,
      "description": this.roleF.description.value,
      "GroupName":this.roleF.groupName.value
    }
    console.log(JSON.stringify(UserRole));
    if (this.roleRegisterForm.valid) {
      this.authenticationService.roleCreation(UserRole)
        .subscribe(data => {
          console.log(data);
        },
          error => {
            this.error = error;
            this.loading = false;
          });
      this.submitted = false;
      this.roleRegisterForm.reset();
    }
    else {
      alert("Please fill the field Properly");
    }
  }

}
