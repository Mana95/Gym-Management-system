import { config } from './../../../config/config';
import { FileUploader } from 'ng2-file-upload';
import { User } from './../../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import {} from '../../../../../../backend/uploads'
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
  buttonStatus = false

  @Input() isChecked = false;

  error = '';
  locaionPath: any;

  userId: any;
  FormValue: any;
  userRole: any;
  CurrentDate: any;
  imageData: any;
  newImage:any;
  imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  profileUrl :any = '../../../../../../backend/uploads/E_BFZXF5AP/0.jpg';

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
    //let Phonenumber = "^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$"
    this.userRegisterFrom = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      birth: [''],
      age: ['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      Emergency: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      address: ['', Validators.required],
      description: [''],
      document:['', Validators.required],
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


    const fileEvnet = event.target.files[0];
    if(fileEvnet){
      this.buttonStatus = true;
    }
    console.log(fileEvnet);
    this.newImage = fileEvnet;
 
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

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png') {
        return true;
    }
    else {
        return false;
    }
}

  onSubmit(userID) {
    this.submitted = true;
    this.loading = true;
    const formData = new FormData();
    //let fileItem = this.uploader.queue[0]._file;


   formData.append('file',  this.newImage);

   console.log(this.newImage.destination);

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
   
  
      if(this.userRegisterFrom.valid){
        alert('Hey');
      
















      this.uploadImage(formData, this.f.id.value).subscribe(
        (res) => {
          console.log(res)
          console.log("This is the reposne " + JSON.stringify(res));
          this.locaionPath = res.destination;
       //Insertion of Employee
          let UserCreationParam = {
            id: this.f.id.value,
            image: this.newImage.name,
            email: this.f.email.value,
            birth: this.f.birth.value,
            age: this.f.age.value,
            firstName: this.f.firstName.value,
            username: this.f.username.value,
            lastName: this.f.lastName.value,
            password: this.f.password.value,
            phonenumber: this.f.phonenumber.value,
            Emergency: this.f.Emergency.value,
            role: 'User',
            imagePath: this.locaionPath,
            address: this.f.address.value,
            description: this.f.description.value,
            active: true,
            date: this.CurrentDate
          }
       
          this.authenticationService.EmployeeCreate(UserCreationParam)
          .subscribe(
            response=>{
              console.log(response.message);
            },
            error=>{
              console.log(error);
              this.error =error;
              this.loading = false;
            },
            ()=>{
              // this.authenticationService.userCreationPub(UserData)
              // .subscribe(
              //   response => {
              //     console.log(response)
                  
              //    // location.reload();
              //     console.log('All Done')
                  
              //   }
              // )
            }
          )
          },
      );
    }

  }


  checkBoxValue(data) {
    alert(data.value);

  }

  uploadImage(data: FormData, uniqueId): Observable<any> {
    // tslint:disable-next-line:no-debugger
    alert("This is the " + data);
    return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);


  }

}
