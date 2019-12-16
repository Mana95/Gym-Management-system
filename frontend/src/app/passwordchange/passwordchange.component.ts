import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.scss']
})
export class PasswordchangeComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;

  changepwGroup: FormGroup;

  active = false;
  submitted = false;   
  loading = false;
  errorValue: any;
  error:'';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  get f() {
    return this.changepwGroup.controls;
}



RequestResetUser(form) {
  console.log(form)
  if (form.valid) {
    this.IsvalidForm = true;
    this.authenticationService.requestReset(this.RequestResetForm.value)
    .subscribe(
      data => {
        this.RequestResetForm.reset();
        this.successMessage = "Reset password link send to email sucessfully.";
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['signup']);
        }, 3000);
      },
      err => {

        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  } else {
    this.IsvalidForm = false;
  }
}

}
