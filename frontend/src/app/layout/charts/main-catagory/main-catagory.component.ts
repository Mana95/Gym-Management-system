import { CatagoryService } from './../../../services/catagory.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main-catagory',
  templateUrl: './main-catagory.component.html',
  styleUrls: ['./main-catagory.component.scss']
})
export class MainCatagoryComponent implements OnInit {
  catDetails: any;
  userGroup:any;
  loading = false;
  error = '';

  constructor(
    private catagoryService: CatagoryService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.catagoryService.getAll()
    .subscribe(
      data => {
       this.userGroup = data
        console.log(data);
      }
    );
   
  }

  loadData(data) {
    alert(data)
  }

  deleteRecord(data) {
    console.log(data._id);
    let idData = {
      "id" : data._id
    }
    this.catagoryService.deleteRecord(idData)
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
