import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConfirmMessageComponent } from 'src/app/message/confirm-message/confirm-message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  modalRef: BsModalRef;
  page = 1;
  pageSize = 4;
  userview: any;
  p: number = 1;
  searchText:any;
  profileUrl: any = '../../../../../../backend/uploads/';
  loading = false;
  error = '';
  refresh: false;
  message: string;
  editMessage = false;
  assigneValue: any;
  deleteMessage: any;
  thisSalectedValue= 'active';
  showStatus = false;
  selectOptionStatus = ['Active Employee','Inactive Employee'];
  constructor(
  
    private authenticationService: AuthenticationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) { }


  ngOnInit() {
    this.loadTableData();
  }


  deleteRowData(data) {
    this.deleteMessage = data;
    //this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    const modalRef = this.modalService.open(ConfirmMessageComponent);
    modalRef.componentInstance.displayMessage =`Are you sure you want to delete ${data.firstName}? ` ;
    modalRef.result.then((result) => {
    }).catch( (result) => {
      console.log(result)
      if(result){
        let idData = {
          "id": this.deleteMessage._id,
          "EmpId": this.deleteMessage.id
        };
        this.authenticationService.deleteRecord(idData)
          .subscribe(data => {

            this.loadTableData();
          },
            error => {
              this.error = error;
              this.loading = false;
    
            });
        this.loadTableData();
      }
     
    });

      
    

  }

  openModalEdit(data, template: TemplateRef<any>) {
    // id = this.assigneValue.userId;
    this.router.navigate(['/editUser', data._id]);
    
  }
 

  loadTableData() {
    this.authenticationService.getAllUsers()
      .subscribe(
        data => {
          //     data.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(data.imagePath);
          //  let imagePath =  this.sanitizer.bypassSecurityTrustResourceUrl(data.imagePath);
          //  for(let i = 0 ,j=data.length;i<j;i++){

          //  }
          if (Array.isArray(data)) {
            console.log(data);
            // for (let i = 0, j = data.length; i < j; i++) {
            
            //   let imagepath = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/assets/u/E_4J95WAR9/2.jpg');
            //   data[i].imagePath = imagepath;

            // }
          }
          this.userview = data;
          //  this.userview.imagePath=


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

  deleteRecord(data, template: TemplateRef<any>) {
    // alert(data);
    this.deleteMessage = data;
  //  this.modalRef = this.modalService.show(template, { class: 'modal-sm' });


  }
  getChangeValue(event){
    let selectedValue = event.target.value;
    switch(selectedValue){
      case this.selectOptionStatus[0]:
        this.thisSalectedValue = 'active';
          this.getStatusvalue(true);
        break;
        case this.selectOptionStatus[1]:
          this.thisSalectedValue = 'inactive';
          this.getStatusvalue(false);
        break;
    }


}
getStatusvalue(status:boolean) {
  this.authenticationService.getReleventActivationOfEmployee(status)
      .subscribe(
        res=>{
          this.userview = res;
          console.log(res)
        }
      )
}


  activeEmployee(){
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
      )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
    })
  }


}