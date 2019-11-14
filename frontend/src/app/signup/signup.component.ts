import { AuthenticationService } from './../services/authentication.service';
import { User } from './../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {


registerForm : FormGroup;
   //Decalre the variables
submitted : false;
loading : false;
error:'';
currentUser : User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService

    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email:['',Validators.required],
            password: ['', Validators.required]
        });
    }
//controlling the register
get registerControls() {
    return this.registerForm.controls;
}

onSubmit() {
alert("This is the Submit Form");

let userParam = {
    "username": this.registerControls.username.value , "password": this.registerControls.password.value , "email": this.registerControls.email.value
}

this.authenticationService.register(userParam)
.subscribe(
    data=> {
        console.log(data);
    },
    error => {
        this.error = error;
        this.loading = false;
    }
);

}
}
