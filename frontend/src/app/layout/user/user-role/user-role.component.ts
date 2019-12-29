import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
userRole : any;
show:true;
role_name:any;
id:any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
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
  routePage(data) {
    console.log(JSON.stringify(data));
    this.router.navigate(['/editRole', data._id]);
    console.log("Navigate to Edit Group " + data._id);
  }

  getRoleName(data) {
    alert('aaa'+ data);
    let getData = {
      id: data
    } 
    this.authenticationService.getRoleUser(data)
    .subscribe(
      res=>{
        this.role_name = res;
        console.log(res);
      }
    )
  }
  deleteRecord(deleteData) {
      console.log(deleteData)
  }


}
