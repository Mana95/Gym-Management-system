import { config } from './../../../config/config';
import { FileUploader } from 'ng2-file-upload';
import { User } from './../../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as moment from "moment";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',

  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userRegisterFrom: FormGroup;
  

  submitted = false;
  loading = false;
  removeUpload: boolean = false;
  editFile: boolean = true;

  @Input() isChecked = false;

  error = '';

  userId : any;
  FormValue:any;
  userRole :any;
  CurrentDate:any;
  imageData:any;

  imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  
  user = new User();
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
 
    this.userRegisterFrom = this.formBuilder.group({
      id:[''],
      email: ['', [Validators.required, Validators.email]],
      birth:[''],
      age:['', Validators.required],
      firstName: ['', Validators.required],
      username: ['' , Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      Emergency:['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      address: ['', Validators.required],
      description: [''],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: this.MustMatch('password', 'confirmPassword')
  })
    this.user.active = false;
     
 let currentDates = moment().subtract(10, "days").calendar();
  this.CurrentDate = currentDates;

   //Id Gen
   var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
   var string_length = 8;
   var id = "E_" + "";
   for (var i = 0; i < string_length; i++) {
     var rnum = Math.floor(Math.random() * chars.length);
     id += chars.substring(rnum, rnum + 1);
     this.userRegisterFrom.controls["id"].setValue(id);
     
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

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  //
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
  get f() {

    return this.userRegisterFrom.controls;

  }


  uploadFile(event) {
  
    const uploadData = new FormData();
    let fileItem = this.uploader.queue;
    // uploadData.append('file', fileItem);
    this.imageData = event.value;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.userRegisterFrom.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  onSubmit(userID) {
    this.submitted = true;
    this.loading = true;
    let data = new FormData();
    let fileItem = this.uploader.queue[0]._file;
    data.append('file', fileItem);
    data.append('fileSeq', 'seq' + 0);

   

    let UserCreationParam = {
      id:this.f.id.value,
      profileImage:fileItem,
      email: this.f.email.value,
      birth:this.f.birth.value,
      age:this.f.age.value,
      firstName: this.f.firstName.value,
      username: this.f.username.value,
      lastName: this.f.lastName.value,
      password: this.f.password.value,
      phonenumber: this.f.phonenumber.value,
      Emergency:this.f.Emergency.value,
      role:'User',
      address:this.f.address.value,
      description: this.f.description.value,
      active: true,
    };

    console.log(UserCreationParam)

    let UserData = {
      user_id: this.f.id.value,
      username: this.f.username.value,
      firstName: this.f.username.value,
      role: "User",
      email: this.f.email.value,
      active: true,
      password: this.f.password.value
    };
    //console.log(JSON.stringify(UserCreationParam));
    if (this.userRegisterFrom.valid) {
alert('awa')
      this.authenticationService.EmployeeCreate(UserCreationParam )
        .subscribe(data => {
          console.log(data);
        },
          error => {
            this.error = error;
            this.loading = false;

          },
          ()=>{
            //alert("Register succeeded");
            this.submitted = false;
            this.userRegisterFrom.reset();
            this.authenticationService.userCreationPub(UserData)
            .subscribe(
              response=> {
                console.log(response)
              },
              ()=>{
                console.log('Done')
              }
            )
          });
     
    } 
    // this.uploadImage(data , this.f.id.value).subscribe(
    //   (res) => {
    //     console.log(res)
    //   //  console.log("This is the reposne " + res);
    //      //   this.locaionPath = res.path;
      
    //   }
    //         );
  }


  checkBoxValue(data) {
  alert(data.value);

  }

  uploadImage(data:FormData ,uniqueId): Observable<any> {
    // tslint:disable-next-line:no-debugger
  alert("This is the "+ data);
    return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
    

  }

}
