import { User } from './../../../_models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { config } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  employeeName : string;
  submitted = false;
  loading = false;
  removeUpload = false;
  editFile = true;
  buttonStatus = true;
  formData: User;
  userRole: any;
  imageData: any;
  newImage: any;
  id: any;
  _id:any;
  activeStatus: '';
  emailValue: any;
  userEditFrom: FormGroup;
  imageUrl: any;
   error = '';

   FormValue: any;
   user = new User();
   valueUser: any;
  oldImageUrl: any;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit() {

    this.loadDataForm();

  }

  // getting the relvent data
  loadDataForm() {

    this.userEditFrom = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      birth: [''],
      age: ['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
     
      // tslint:disable-next-line:max-line-length
      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      // tslint:disable-next-line:max-line-length
      Emergency: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      address: ['', Validators.required],
      description: [''],
      gender: [''],
      document: [''],
    }
    );

    this.id =  this.id = (this.route.snapshot.paramMap.get('userid'));
    console.log(this.id);
    this.authenticationService.getById(this.id)
    .subscribe(
      data => {
        this.valueUser = data;
        this.user = this.valueUser;
        this.userEditFrom.controls['id'].setValue(data[0].id);
      this.employeeName = data[0].firstName
        this._id = data[0]._id
        this.userEditFrom.controls['email'].setValue(data[0].email);
        this.userEditFrom.controls['age'].setValue(data[0].age);
        this.userEditFrom.controls['firstName'].setValue(data[0].firstName);

        this.userEditFrom.controls['lastName'].setValue(data[0].lastName);
        this.userEditFrom.controls['phonenumber'].setValue(data[0].phonenumber);
        this.userEditFrom.controls['Emergency'].setValue(data[0].Emergency);
        this.userEditFrom.controls['address'].setValue(data[0].address);
        this.userEditFrom.controls['description'].setValue(data[0].description);
        this.userEditFrom.controls['gender'].setValue(data[0].gender);
        this.userEditFrom.controls['birth'].setValue(data[0].birth);
        this.userEditFrom.controls['document'].setValue(data[0].document);
        this.imageUrl = data[0].imagePath;
        this.oldImageUrl = data[0].imagePath;
      }
    );
  }

  get f() {

    return this.userEditFrom.controls;

  }




  

  updateRecords(data1, data2) {
    alert('This is the submit button method' + this.f.userId)
;
const id = 'PO' + Math.random().toString(36).substr(2, 9);
const PO_id = '-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9);
console.log(id);
console.log(PO_id);
  }

  uploadFile(event) {
    const fileEvnet = event.target.files[0];

    console.log(fileEvnet);
    this.newImage = fileEvnet;

    const uploadData = new FormData();
    uploadData.append('file', this.newImage);
    this.imageData = event.value;
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.userEditFrom.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


  onSubmit() {


    let UserData = {
      user_id: this.f.id.value,
      firstName: this.f.firstName.value,
      role: "Instructor",
      email: this.f.email.value,
      nicNumber:this.f.age.value,
    }
//alert('submit');
const editUserDetails = {
  _id:this._id,
  id: this.f.id.value,
  email: this.f.email.value,
  image: this.imageUrl,
  birth: this.f.birth.value,
  age: this.f.age.value,
  firstName: this.f.firstName.value,
  lastName: this.f.lastName.value,
  phonenumber: this.f.phonenumber.value,
  Emergency: this.f.Emergency.value,
  role: 'User',
  imagePath: this.imageUrl,
  address: this.f.address.value,
  gender: this.f.gender.value,
  description: this.f.description.value,
  active: true,
 };
 const formData = new FormData();
 formData.append('file',  this.newImage);
   if(this.userEditFrom.valid){
    const postsImage =  this.uploadImage(formData , this.f.id.value);
    const updateEmpyee =  this.authenticationService.updateUser(editUserDetails ,UserData)
      if(this.oldImageUrl == this.imageUrl){
        this.authenticationService.updateUser(editUserDetails ,UserData)
        .subscribe(response => {
        
          if(response.ok !=undefined && response.ok ==1){
            Swal.fire({
                text: 'Employee Updated successfully',
                icon: 'success'
              });      
        }
         
        },error=> {
          this.error = error;
          this.loading = false;
        })
      }
      forkJoin([postsImage , updateEmpyee])
      .subscribe(
         result=>{
             if(result[1].ok ==1){
              Swal.fire({
                  text: 'Employee Updated successfully',
                  icon: 'success'
                });
             }
         }
      )


   }

 


//     console.log("Update"+JSON.stringify(editUserDetails));

}
uploadImage(data:FormData ,uniqueId): Observable<any> {
  // tslint:disable-next-line:no-debugger
// alert("This is the "+ data);
  return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
  

}

}
