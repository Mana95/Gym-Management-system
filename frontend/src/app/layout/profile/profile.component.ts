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
  displayProfileData :any;
  stepperNumber :number = 0;
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
        this.displayProfileData = data[0];
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
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
  navigateNextStepper(navNumber){
   
        this.stepperNumber =navNumber
    
  }
}
