import { CatagoryService } from './../../../services/catagory.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainNewCatagoryComponent } from './main-new-catagory/main-new-catagory.component';
import { MessageAlertDisplay } from 'src/app/common-class/message-alert-display';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.loadData();
    
   
  }

  loadData() {
    this.catagoryService.getAll()
    .subscribe(
      data => {
       this.userGroup = data
        console.log(data);
      }
    );
  }

  deleteRecord(data) {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      );
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
      this.loadData();
    } })


  }

  openModal() {
    const modelRef = this.modalService.open(MainNewCatagoryComponent);
    
   //modelRef.componentInstance.user = rowData;
    modelRef.result.then((result) => {
      if (result) {
        MessageAlertDisplay.SuccessToastMessage(result.message);
        this.loadData();
      }
      });
  }

}
