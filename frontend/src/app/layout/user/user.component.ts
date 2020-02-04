import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  
  page = 1;
  pageSize = 4;
  userview: any;
  p: number = 1;
  searchText;
  profileUrl:any = '../../../../../../backend/uploads/';
  loading = false;
  error = '';
  refresh:false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }
public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
  ngOnInit() {



    this.loadTableData();
  
  }
  loadTableData() {
    this.authenticationService.getAllUsers()
    .subscribe(
      data => {
       this.userview = data
       this.userview
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

  //  console.log(data._id);
    let idData = {
      "id" : data._id,
     "EmpId":data.id
    }
    this.authenticationService.deleteRecord(idData)
    .subscribe(data => {
      // console.log(data.message);
      refresh:true;
    },
    error => {
      this.error = error;
      this.loading = false;

    });
    this.loadTableData();
  }

  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
