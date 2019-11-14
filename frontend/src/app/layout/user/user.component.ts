import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userview: any;
  loading = false;
  error = '';
  refresh:false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authenticationService.getAllUsers()
    .subscribe(
      data => {
       this.userview = data
        console.log(data);
      }
    );
  }

  routePage(data) {

   // alert(data.userId)
    console.log(JSON.stringify(data));
  let id = data.userId;
  this.router.navigate(['/editUser', data._id]);
  console.log("this is the number which have been passed to the Edit User page " + data._id);

  }

  deleteRecord(data) {

    console.log(data._id);
    let idData = {
      "id" : data._id
    }
    this.authenticationService.deleteRecord(idData)
    .subscribe(data => {
      console.log(data);
      refresh:true;
    },
    error => {
      this.error = error;
      this.loading = false;

    });
    location.reload();
  }

}
