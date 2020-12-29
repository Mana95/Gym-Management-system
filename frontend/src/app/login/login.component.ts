import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
///service


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    backendMessage:any;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    statusMessage = false;
     erroShow = false;
     showErrorMessage :boolean =false;
     loginCounter :number=0;
     counter:number;
     currentUser:any;
    constructor(
        private formBuilder: FormBuilder,
        public router: Router,

      private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy(){
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      
    }
    changeStatus(){
      this.showErrorMessage = false;
    };

    get loginFormControler() {
        return this.loginForm.controls;
     }

     
//submig the login 
    onSubmit() {


    

    this.submitted = true;
    if (this.loginForm.valid) {
    this.loading = true;
    this.authenticationService.login(this.loginFormControler.email.value, this.loginFormControler.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.errorStatus != undefined && data.errorStatus == false){
            this.currentUser = this.authenticationService.currentUserValue;
            if(this.currentUser && this.currentUser.role == 'Member'){
              this.authenticationService.checkMembership( this.currentUser.user_id)
              .subscribe(
                response =>{
                 if(response.message == 'Inprogress'){
                  localStorage.setItem('dashboadStatus', 'true');
                 }else{
                  localStorage.setItem('dashboadStatus', 'false');

                 }
                }

              )


            }
            this.router.navigate(['/dashboard']);
          };
        },
        error => {

            //password limiter
          this.setLoginCounter()





          this.error = error.error.message
          this.loading = false; 
          if(error.error != undefined && error.error.message.errorStatus ==true){
            this.showErrorMessage = true;
            this.backendMessage = error.error.message.message;
          }
        });
      };
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    setLoginCounter() {
      this.loginCounter += 1;
      localStorage.setItem('logCount', this.loginCounter.toString());

      if (this.loginCounter % 3 === 0) {
                this.counter = 30 * (Math.pow(2, (this.loginCounter / 3) - 1));
                console.log(this.counter)
      }

    }
}
