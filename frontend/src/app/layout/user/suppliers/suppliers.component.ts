import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  supData:any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authenticationService.getAllSuppliers()
    .subscribe(
      res=>{
        console.log(res);
        this.supData = res;

      }
    )
  }

  confirm(){

  }

  decline() {
    
  }

}
