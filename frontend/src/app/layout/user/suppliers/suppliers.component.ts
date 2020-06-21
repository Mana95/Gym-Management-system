import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
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
    this.tableLoadData();
   
  }
  tableLoadData() {
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
  routePage(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/edit-supplier-page', data._id]);   

      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
     
      }
    })
    
  }
  deleteSupplier(data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteSupplierDetails(data);
     
    
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
     
      }
    })
  }


  deleteSupplierDetails(supplierData) {
    this.authenticationService.updateSupplierDelettion(supplierData)
    .subscribe(
      response=>{       
        if(response==1){
          Swal.fire({
         
            text: 'Supplier Delete successfully',
            icon: 'success'
         
          });

          this.tableLoadData();

        }
        else{
        Swal.fire('Oops...', `Internal Server error`, 'error');
      }}
    )
  }
}
