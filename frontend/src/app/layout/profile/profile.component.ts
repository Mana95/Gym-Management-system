import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { User } from 'src/app/_models';
import { map, filter, debounceTime, distinctUntilChanged, first } from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  
})
export class ProfileComponent implements OnInit {
  id:any;
  displayProfileData :any;
  stepperNumber :number = 0;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  changePasswordGroup :FormGroup;
  profileGroup:FormGroup;
  editmode  = false;
  oldpwStatus = false;
  submitted2 = false;
  showPwAlert = false;
  showResetStatus = false;
  @ViewChild('oldSearchInput', { static: true }) oldSearchInput: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,

  ) { 
     this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() { 
    this.loadDataForm();
    fromEvent(this.oldSearchInput.nativeElement, 'keyup').pipe(
      map((event:any)=>{
        this.showPwAlert = false;
        if(event.target.value == ''){
          this.oldpwStatus = false
        }
        return event.target.value
      })
      ,filter(res=>res.length >2)
      ,debounceTime(1000)
      ,distinctUntilChanged()
    ).subscribe(text=>{
        this.authenticationService.validateOldPassword({password:text , id:this.displayProfileData.user_id}).subscribe(
          res=>{
          console.log(res)
          this.oldpwStatus = true
        },err=>{
          if(err.status == 500){
            this.oldpwStatus = false
            this.showPwAlert = true;
          }else{
            this.oldpwStatus = true; this.showPwAlert = false;
          }
        
        })
      
      
    });
  }
  get showResetStatusMethod() {
    return this.showResetStatus
  }
  onGoToPage2() {
    let value = !this.showResetStatus?1:2;
    if(value==1){
      this.showResetStatus = true;
      return {status:true , message:'Change password'}
    }
    this.showResetStatus = false;
    return {status:true , message:'Reset password'}
    
  }
  resetPassword(event){

  }
  loadDataForm() {
    this.id = (this.route.snapshot.paramMap.get('id'));
    const role = this.currentUserSubject.value.role;
    
    this.authenticationService.loadProfileData(this.id)
    .subscribe(
      data => {
        this.displayProfileData = data[0];
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    );

      //changepassword
      this.changePasswordGroup = this.formBuilder.group({
         oldPassword:[''],
        password : ['' , [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      });

      //validation profile
      this.profileGroup = this.formBuilder.group({
        fristName:['',Validators.required],
        lastName:['',Validators.required],
        email :['',Validators.required],
        address:['',Validators.required],
        company:['',Validators.required],
        description:['',Validators.required],
        image:['',Validators.required]
      })

  }
  get f() {
    return this.changePasswordGroup.controls;
    
  }
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
  get getUserId() {
    if(this.displayProfileData){
      switch(this.displayProfileData.role){
        case 'Admin':
          return this.displayProfileData.user_id
        break;
        case 'Membership':
          return this.displayProfileData.customerID
        break;
        case 'Instructor':
          return this.displayProfileData.isId
        break;
      }
  
    }

 



  }
  editMode() {
   !this.editMode?true:false 
  }

  onSubmit() {

  }

  onSubmitChange() {
    this.submitted2 = true;
    if(this.oldpwStatus && this.changePasswordGroup.valid){

        let changeObject = {
          id:this.displayProfileData.user_id,
          password:this.f.password.value,
        }
        this.authenticationService.changePassword(changeObject)
        .pipe(first())
        .subscribe(
          res=>{
           this.changePasswordGroup.reset();
        Swal.fire({
          text: res.message,
          icon: 'success'
        });
        this.oldpwStatus = false
        this.submitted2 = false;
          },
          error=>{
            Swal.fire('Oops...', `${error.message}`, 'error');
          },
          ()=>{

          }
        )


    }else{
      Swal.fire('Oops...', `Please enter the corrrect old password!`, 'error');

    }
  }

  navigateNextStepper(navNumber){
   
        this.stepperNumber =navNumber
    
  }
  get getStatus() {
    if(this.oldpwStatus == true){
        return false
    }
    return true
  }
}
