import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

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

    this.loadData();
    

  }

  loadData() {
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

  inactiveMembership(selectedMembership) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.authenticationService.inActiveMembership(selectedMembership)
        .subscribe(
          response=>{
            if(response==1){
              Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
                  this.loadData();
            }
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
    })
  }

  checkIfDisabled(data){
      if(data.status != 'true'){
          return true;
      }
      return false;
  }

}
