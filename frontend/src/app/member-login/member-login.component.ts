import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.scss']
})
export class MemberLoginComponent implements OnInit {
  submitted = false;
  memberGroup:FormGroup;
  active = false;
  errorValue: any;
  user_id :any;
  error : any;

  constructor(
    private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService,
    public router: Router,
    
  ) { }

  ngOnInit() {
    //Calling to the gen user Id method
    this.genrateUserID();
    //setup the formControls
    this.memberGroup = this.formBuilder.group({
      nicNumber:['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      firstName:['', Validators.required],
      email:['',[ Validators.required , Validators.email]],
      password:['',Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: this.MustMatch('password', 'confirmPassword')
    })
  }

  setInactive() {
    
  }

 get f() {
    return this.memberGroup.controls;
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

  //Gen the user id
  genrateUserID() {
     //Id Gen
     var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
     var string_length = 8;
     var id = "E_" + "";
     for (var i = 0; i < string_length; i++) {
       var rnum = Math.floor(Math.random() * chars.length);
       id += chars.substring(rnum, rnum + 1);
     }
        this.user_id = id
  }

  onSubmit() {
    this.submitted = true;

    let memberData = {
      user_id: this.user_id ,
      nicNumber:this.f.nicNumber.value,
      firstName:this.f.firstName.value,
      email:this.f.email.value,
      password:this.f.password.value,
      membershipStatus: false,
      role:'Member',
      active : true
    }

    console.log(memberData);

      if(this.memberGroup.valid){
        this.authenticationService.saveMembership(memberData)
        .subscribe(
          response=>{
              Swal.fire({
                text: 'Registered  success',
                icon: 'success'
              });
              this.memberGroup.reset();
             this.router.navigate(['/login']);
          },
          error=>{
        
             if(error.error&& error.error.message){
               if(error.error.message.array.length == 1){
                this.error = error.error.message.array[0] + ' Already avaible';
               }else{
                this.error = error.error.message.array[0] + ' and '+ error.error.message.array[1] + ' Already avaible';
               }
             }
            console.log('Error');
            console.log(error);
          }

        )
      }




    

  }

}
