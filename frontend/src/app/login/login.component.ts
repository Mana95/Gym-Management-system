import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
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
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
      public router: Router,

      private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });


    }

    get f() {
        return this.loginForm.controls;
     }

     

    onSubmit() {
      
  console.log('Here is the Login method');
   this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.f.username.value);
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)

      .pipe(first())
      .subscribe(
        data => {
         console.log(data)
         this.router.navigate(['/dashboard']);
       //   console.log(gat)
        //  this.router.navigate([]);
        },
        error => {
          this.error = error.error.message
          this.loading = false;
          console.log(error.error.message)
         // alert(error.error.message)

        });

        
      

    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
