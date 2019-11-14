import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userGroup: any;
  constructor(
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
    let id = data.GroupId
    console.log(data);
    

    alert(id);
  }

}
