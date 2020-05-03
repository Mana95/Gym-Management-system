import { PasswordStrengthValidator } from './../../../../_models/password-strength.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AlertMessages } from 'src/app/_models/schedule-status';

@Component({
  selector: 'app-new-suppliers',
  templateUrl: './new-suppliers.component.html',
  styleUrls: ['./new-suppliers.component.scss']
})
export class NewSuppliersComponent implements OnInit {
  supRegister:FormGroup;
  submitted = false;
  loading = false;
  error = '';
  userId : any;
  sendMails:any;
  dateFieldValid = false;
  day:any;
  Type = ['All' , 'Normal Items' , 'Cart Itemss'];
  constructor( 
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.supRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      companyAddress :['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      nicNumber:['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      username:['', [Validators.required]],
      company:['' , Validators.required],
      sup_category:['', Validators.required],
      confirmPassword: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      phonenumber1:['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      description:['',  Validators.required],
      birth:[''],
      email: ['', [Validators.required, Validators.email]],
    },
    {
      validator: this.MustMatch('password', 'confirmPassword')
    });
    this.loadNewId();
    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'SUP_'+'';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum,rnum+1);
      this.userId = id;

    }
  }
  loadNewId(){
     //Id Gen
     var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
     var string_length = 8;
     var id = 'SUP_'+'';
     for (var i=0; i<string_length; i++) {
       var rnum = Math.floor(Math.random() * chars.length);
       id += chars.substring(rnum,rnum+1);
       this.userId = id;
     }
    }

  onKey(event){

    let NICNo  = event.target.value;
    ///console.log(event.target.value);
    var dayText = 0;
    var year = "";
    var month = "";
  
    var gender = "";
  
      // Year
      if (NICNo.length == 10) {
        year = "19" + NICNo.substr(0, 2);
        dayText = parseInt(NICNo.substr(2, 3));
      //  console.log(year);
       // console.log(dayText);
    } else {
        year = NICNo.substr(0, 4);
        dayText = parseInt(NICNo.substr(4, 3));
      //  console.log(year);
     //   console.log(dayText);
    }
      // Gender
      if (dayText > 500) {
        gender = "Female";
        dayText = dayText - 500;
    } else {
        gender = "Male";
    }
    // Day Digit Validation
    if (dayText < 1 && dayText > 366) {
  //onsole.log("Invalid ID");
  }else{
     //Month
     if (dayText > 335) {
     this.day = dayText - 335;
      month = "December";
     // console.log(month);
  }
  else if (dayText > 305) {
     this.day = dayText - 305;
      month = "November";
  }
  else if (dayText > 274) {
     this.day = dayText - 274;
      month = "October";
  }
  else if (dayText > 244) {
     this.day = dayText - 244;
      month = "September";
  }
  else if (dayText > 213) {
     this.day = dayText - 213;
      month = "Auguest";
  }
  else if (dayText > 182) {
     this.day = dayText - 182;
      month = "July";
  }
  else if (dayText > 152) {
     this.day = dayText - 152;
      month = "June";
  }
  else if (dayText > 121) {
     this.day = dayText - 121;
      month = "May";
  }
  else if (dayText > 91) {
     this.day = dayText - 91;
      month = "April";
  }
  else if (dayText > 60) {
     this.day = dayText - 60;
      month = "March";
  }
  else if (dayText < 32) {
      month = "January";
     this.day = dayText;
  }
  else if (dayText > 31) {
     this.day = dayText - 31;
      month = "Febuary";
  }
        //show Details;
        //console.log(gender);
       // console.log(year+ "-" + month + "-" + this.day);
        if(this.f.nicNumber.valid){
          this.dateFieldValid = true;
        }else {
          this.dateFieldValid = false;
        }
        let birthday = year+ "-" + month + "-" + this.day
        this.supRegister.controls['birth'].setValue(birthday);
   
  
  
  }
    
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
  //formconctroller
  get f() {

    return this.supRegister.controls;

  }

  //validation the phone number
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  onSubmit(userID ,content ,contentDone) {
    this.submitted = true;
    this.loading = true;
     let sup_data = {
      sup_id: userID.value,
      sup_firstName: this.f.firstName.value,
      sup_lastName:this.f.lastName.value,
      sup_username:this.f.username.value,
      sup_nicNumber:this.f.nicNumber.value,
      sup_company:this.f.company.value,
      sup_address:this.f.address.value ,
      sup_phonenumber:this.f.phonenumber.value,
      sup_phonenumber1:this.f.phonenumber1.value,
      sup_description:this.f.description.value,
      sup_email:this.f.email.value,
      sup_category:this.f.sup_category.value,
      active:true,
      role:'Supplier'
    }
    let UserData = {
      user_id:userID.value,
      firstName: this.f.firstName.value,
      username:this.f.username.value,
      email:this.f.email.value,
      password:this.f.password.value,
      active:true,
      nicNumber: this.f.nicNumber.value,
      role:'Supplier'
    }

    let mailData= {
      username:this.f.username.value,
      password:this.f.password.value,
      mail:this.f.email.value
    }

  
    if(this.supRegister.valid){
      

const sendMails = this.authenticationService.SendSupplierMail(mailData)  


      this.authenticationService.registerSupplier(sup_data ,UserData ,mailData )
      .subscribe(
        response=>{
          if(response ==1){
            Swal.fire({
              text: 'Supplier Registered successfully',
              icon: 'success'
            });
            this.submitted = false;
            this.supRegister.reset();
            this.loadNewId();
          }else{
            if(response.length ==1){
              Swal.fire('Oops...', `${response[0]} Already inserted `, 'error');
            }else if(response.length ==2)
        {
          Swal.fire('Oops...', `${response[0]} ,${response[1]}  Already inserted `, 'error');
        }else if(response.length ==3)  {  
          Swal.fire('Oops...', `${response[0]} ,${response[1]} , ${response[2]} Already inserted `, 'error');
        } 
          }

        }
      )
     

        
        

    }
    else {
      Swal.fire('Oops...', `${AlertMessages.ERRORMESSAGEFORFORMVALIDATION}`, 'error');
    }

  }

    ConfermationModal(content ,contentDone, result1 , result2){
        if(result1==1 && result2==1){
          this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
        }else {
          this.modalService.open(contentDone, {backdropClass: 'light-blue-backdrop'});
        }
    }

}
