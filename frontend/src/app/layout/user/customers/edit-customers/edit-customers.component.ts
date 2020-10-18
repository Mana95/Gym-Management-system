import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import { MembershipService } from 'src/app/services/membership.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {Membership} from  '../../../../_models/Membership.js'
@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.scss']
})
export class EditCustomersComponent implements OnInit {
    inputFieldDisabled:boolean = true;
    editFormGroup:FormGroup;
    submitted = false;
    loading = false;
    error = '';
    userID : any;
    active = false;
    customerData = false;
    errorValue: any;
    day:any;
    dateFieldValid = false;
    Type: any;
    currentTime: any;
    currentDate: any;
    showMsg = false;
    indexId :any;
    usernameValue :any;
    peridType : any;
    valueType: any;
    BMIField = false;
    disaster = false;
    alertDisplay = false;
    paymentAlertMessage = false;
    showPayingPriceInputField = false;
    paymentAlertMessageSuccess = false;
    showMembershipType = false;
    imageUrl: any = '../../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
    display = [{
      "id": "Yes"
    },
    {
      "id": "No"
    }]
    membershipData:any;
    currentTypeArray = [];
    ArrayValueType = [];
  
    public membershipSubject : BehaviorSubject<Membership>;
    public membershipUser:Observable<Membership>;
    
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private membershipService : MembershipService
  ) {
    this.membershipSubject = new BehaviorSubject<Membership>(
      JSON.parse(localStorage.getItem("membership"))
  )
    this.membershipUser  = this.membershipSubject.asObservable();
    this.membershipData =this.membershipSubject.value;
        console.log(this.membershipData);
   }

  ngOnInit() {
    this.editFormGroup = this.formBuilder.group({

      membershipId: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phonenumber: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      phonenumber1: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      Height: ["", Validators.required],
      Weight: ["", Validators.required],
      birth: ["", Validators.required],
      memberId:[''],
      disaster: ['', Validators.required],
      description: [""],
      age:[''],
      gender: ['', Validators.required],
      currnetJoinDate: [""],
      typeName: ["", Validators.required],
      amount: [""],
      VMonth: [""],
      endDate: [""],
      BMI: [""],
      nicNumber: ['', [Validators.required, Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      noteDisaster: [''],
 
      balancePrice: [''],
      packagePrice:[''],
      payingPrice:[''],
      membershipType:[''],
      }) 
   
      this.setupFormData();
  }

  get f() {
    return this.editFormGroup.controls;
  }

  setupFormData() {
    this.editFormGroup.controls["membershipId"].setValue(this.membershipData.membershipId);
    this.editFormGroup.controls["memberId"].setValue(this.membershipData.customerID);
    this.editFormGroup.controls["email"].setValue(this.membershipData.email);
    this.editFormGroup.controls["currnetJoinDate"].setValue(this.membershipData.currnetJoinDate);
    this.editFormGroup.controls["firstName"].setValue(this.membershipData.firstName);
    this.editFormGroup.controls["lastName"].setValue(this.membershipData.lastName);
    this.editFormGroup.controls["phonenumber"].setValue(this.membershipData.phonenumber);
    this.editFormGroup.controls["phonenumber1"].setValue(this.membershipData.phonenumber1);
    this.editFormGroup.controls["nicNumber"].setValue(this.membershipData.nicNumber);
    this.editFormGroup.controls["birth"].setValue(this.membershipData.birth);
    this.editFormGroup.controls["Height"].setValue(this.membershipData.Height);
    this.editFormGroup.controls["Weight"].setValue(this.membershipData.Weight);
    this.editFormGroup.controls["BMI"].setValue(this.membershipData.BMI);
    this.editFormGroup.controls["disaster"].setValue(this.membershipData.disaster);
    this.editFormGroup.controls["membershipType"].setValue(this.membershipData.typeName);
  }
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  uploadFile(event){
    
  }
  onSubmit() {
    this.submitted = true;

  }
  editMode() {
    this.inputFieldDisabled =!this.inputFieldDisabled;
  }
}
