import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
userRole : any;
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.authenticationService.getAllRole()
    .subscribe(
      data => {
       this.userRole = data
        console.log(data);
      }
    );

  }

}
