import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id:any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

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
  }
  loadDataForm() {
    this.id = (this.route.snapshot.paramMap.get('id'));
    const role = this.currentUserSubject.value.role;
    
    this.authenticationService.loadProfileData(this.id)
    .subscribe(
      data => {
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
