import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userGroup: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.authenticationService.getAllGroup()
    .subscribe(
      data => {
       this.userGroup = data
        console.log(data);
      }
    );
  }

  

  routePage(data) {
    console.log(JSON.stringify(data));
    this.router.navigate(['/editGroup', data._id]);
    console.log("Navigate to Edit Group " + data._id);

    

    
  }

}
