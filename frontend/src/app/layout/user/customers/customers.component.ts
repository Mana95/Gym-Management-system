import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  cusData:any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authenticationService.getAllMembership()
    .subscribe(
      res=>{
        console.log(res);
        this.cusData = res;

      }
    )

  }


  routePage(data) {
  console.log(JSON.stringify(data));

  this.router.navigate(['/edit_cus', data._id]);
  console.log("this is the number which have been passed to the Edit User page " + data._id);

  }

}
