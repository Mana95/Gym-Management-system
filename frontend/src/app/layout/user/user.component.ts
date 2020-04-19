import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
  searchText;
  profileUrl: any = '../../../../../../backend/uploads/';
  loading = false;
  error = '';
  refresh: false;
  message: string;
  editMessage = false;
  assigneValue : any;
  deleteMessage :any;

  constructor(
    private modalService: BsModalService,
    private authenticationService: AuthenticationService,
    private router: Router,
    
  ) { }
  

  ngOnInit() {
    this.loadTableData();
  }

  
  openModal(data,template: TemplateRef<any> ) {
    this.deleteMessage = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    
  }

  openModalEdit(data,template: TemplateRef<any> ) {
    
   this.assigneValue = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    if(this.editMessage == true){
      this.modalRef.hide();
    

    }
  }

  //confirm dialog for edit
  confirmEdit() {
    this.editMessage = true;
    let id =  this.assigneValue.userId;
    this.router.navigate(['/editUser', this.assigneValue._id]);
    this.modalRef.hide();
  }

  //confrim dialog to delete user
  confirm() {
    let idData = {
      "id":  this.deleteMessage._id,
      "EmpId":  this.deleteMessage.id
    }
    
    this.authenticationService.deleteRecord(idData)
      .subscribe(data => {
        this.modalRef.hide();
        this.loadTableData();
      },
        error => {
          this.error = error;
          this.loading = false;

        });
    this.loadTableData();
  }

  decline() {
    this.message = 'Declined!';
    this.modalRef.hide();
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

  deleteRecord(data,template: TemplateRef<any>) {
   // alert(data);
   this.deleteMessage = data;
   this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    
   
  }

  
}
