import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config/config';


@Component({
  selector: 'app-edit-suplliers',
  templateUrl: './edit-suplliers.component.html',
  styleUrls: ['./edit-suplliers.component.scss']
})
export class EditSuplliersComponent implements OnInit {
  supllierUpdate:FormGroup;
  submitted = false;
  loading = false;
  id:any;
  FormValue: any;
  imageErrorMessage = false;
  error = '';
  imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  profileUrl: any = '../../../../../../backend/uploads/';
  oldImageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
 
  userId : any;
  sendMails:any;
  dateFieldValid = false;
  day:any;
  Type = ['All' , 'Nuritions' , 'Equipment'];
  imageData: any;
  newImage: any;
  buttonStatus: boolean;
  removeUpload: boolean;
  editFile: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    ) { }
    public uploader: FileUploader = new FileUploader({
      isHTML5: true
    });

  ngOnInit() {
    this.supllierUpdate = this.formBuilder.group({
      id:[''],
      firstName: ['', Validators.required],
      companyAddress :['', Validators.required],
      lastName: ['', Validators.required],
      active:[''],
     // gender:[''],
      address: ['', Validators.required],
      nicNumber:['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      company:['' , Validators.required],
    

      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      Emergency:['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      description:['',  Validators.required],
     // birth:[''],
      document:[''],
      email: ['', [Validators.required, Validators.email]],
    });
    this.loadFormData();
  }
  loadFormData() {
    this.id =  this.id = (this.route.snapshot.paramMap.get('id'));
    this.authenticationService.getReleventUserData(this.id)
    .subscribe(
      result=>{
        this.supllierUpdate.controls['id'].setValue(result[0].sup_id);
        this.supllierUpdate.controls['firstName'].setValue(result[0].sup_firstName);
        this.supllierUpdate.controls['lastName'].setValue(result[0].sup_lastName);
        this.supllierUpdate.controls['nicNumber'].setValue(result[0].sup_nicNumber);
        this.supllierUpdate.controls['phonenumber'].setValue(result[0].sup_phonenumber);
        this.supllierUpdate.controls['Emergency'].setValue(result[0].sup_phonenumber1);
        this.supllierUpdate.controls['description'].setValue(result[0].sup_description);
        this.supllierUpdate.controls['email'].setValue(result[0].sup_email);
        this.supllierUpdate.controls['active'].setValue(result[0].active);
        this.supllierUpdate.controls['company'].setValue(result[0].sup_company);
        this.supllierUpdate.controls['address'].setValue(result[0].sup_address);
           this.supllierUpdate.controls['companyAddress'].setValue(result[0].sup_company_address);
        this. imageUrl = result[0].image;
      }
    )

  }

  get f() {
    return this.supllierUpdate.controls;

  }
  uploadFile(event) {
    const fileEvnet = event.target.files[0];
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
        this.supllierUpdate.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  onSubmit(){
    this.submitted = true;
    
     let UserData = {
      user_id: this.f.id.value,
      firstName: this.f.firstName.value,
      email: this.f.email.value,
      active: this.f.active.value,
    }
//alert('submit');
const supplierDetails = {
  _id:this.id,
  id: this.f.id.value,
  email: this.f.email.value,
  image: this.imageUrl,
  sup_company_address: this.f.companyAddress.value,
  firstName: this.f.firstName.value,
  lastName: this.f.lastName.value,
  phonenumber: this.f.phonenumber.value,
  Emergency: this.f.Emergency.value,
  address: this.f.address.value,
  description: this.f.description.value,
  active: this.f.active.value,
 };
 const formData = new FormData();
 formData.append('file',  this.newImage);
 if(this.supllierUpdate.valid){
//  const postsImage =  this.uploadImage(formData , this.f.id.value);
  //const updateSupplier =  this.authenticationService.updateUser(supplierDetails ,UserData);

    this.authenticationService.updateSupplier(supplierDetails ,UserData)
    .subscribe(response => {
      console.log(response)
      if(response ==null){
        return;
      }
      if(response != undefined && response ==1){
        
        Swal.fire({
            text: 'Employee Updated successfully',
            icon: 'success'
          });
          return;      
    }else{
      Swal.fire('Oops...', `Internal Server Error Please Cotact Admin`, 'error')
     }
     
    },error=> {
      console.log(error);
      Swal.fire('Oops...', `${error.statusText} Please Cotact Admin`, 'error')
      this.error = error;
      this.loading = false;
    })
  }

 }
  }

