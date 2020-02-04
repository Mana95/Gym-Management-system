import { User } from './../../../_models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  
  submitted = false;
  loading = false;
  removeUpload: boolean = false;
  editFile: boolean = true;
  buttonStatus = false
  formData : User;
  userRole:any;
  imageData: any;
  newImage:any;
  id:any;
  activeStatus: '';
  emailValue: any;
  userEditFrom:FormGroup;
  imageUrl:any;
   error = '';
   FormValue: any;


   user = new User();
   valueUser : any;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    this.loadDataForm();

    
  }

  //getting the relvent data 
  loadDataForm() {

    this.userEditFrom = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      birth: [''],
      age: ['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      Emergency: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      address: ['', Validators.required],
      description: [''],
      gender:[''],
      document:['', Validators.required],
    }
    )



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

    return this.userEditFrom.controls;

  }

  updateRecords(data1, data2) {
    alert("This is the submit button method"+ this.f.userId)
;
var id = 'PO' + Math.random().toString(36).substr(2, 9);
var PO_id ='-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
console.log(id)
console.log(PO_id);
  }

  uploadFile(event) {
    const fileEvnet = event.target.files[0];
  
    console.log(fileEvnet);
    this.newImage = fileEvnet;
 
    const uploadData = new FormData();
    // uploadData.append('file', fileItem);
    this.imageData = event.value;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.userEditFrom.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
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
