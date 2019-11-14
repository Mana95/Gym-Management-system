import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user-group',
  templateUrl: './new-user-group.component.html',
  styleUrls: ['./new-user-group.component.scss']
})
export class NewUserGroupComponent implements OnInit {
  GroupRegisterForm:FormGroup;
  userGroup:any;
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    



    this.GroupRegisterForm = this.formBuilder.group({
      groupId:['', Validators.required],
      GroupName:['', Validators.required],
      description: ['', Validators.required]

    });
  }

  
  get GroupF() {
    return this.GroupRegisterForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    let UserGroup = {
      "GroupId": this.GroupF.groupId.value,
      "GroupName": this.GroupF.GroupName.value,
      "description": this.GroupF.description.value
    }
    console.log(JSON.stringify(UserGroup));
    if (this.GroupRegisterForm.valid) {
      this.authenticationService.GroupCreation(UserGroup)
        .subscribe(data => {
          console.log(data);
        },
          error => {
            this.error = error;
            this.loading = false;
          });
      this.submitted = false;
      this.GroupRegisterForm.reset();
    }
    else {
      alert("Please fill the field Properly");
    }
  }
  }


