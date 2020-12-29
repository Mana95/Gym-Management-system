import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from "moment";
import { MessageAlertDisplay } from 'src/app/common-class/message-alert-display';
@Component({
  selector: 'app-schedule-type',
  templateUrl: './schedule-type.component.html',
  styleUrls: ['./schedule-type.component.scss']
})
export class ScheduleTypeComponent implements OnInit {
  submitted = false;
  loading = false;
  closeResult: string;

  scheduleTypeGroup: FormGroup;
  scheduleData: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
    private autenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.scheduleTypeGroup = this.formBuilder.group({
      id: [''],
      typeName: ['', Validators.required],
      description: ['']
    });
    this.loadTypeData();
  }

  loadTypeData() {
    this.autenticationService.getAllSchedule()
      .subscribe(
        data => {
          this.scheduleData = data
        }
      )
  }
  loadID() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'ST_' + '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);

      this.scheduleTypeGroup.controls['id'].setValue(id);
    }
  }

  get f() {

    return this.scheduleTypeGroup.controls;

  }

  open(content) {

    this.scheduleTypeGroup.reset();
    this.loadID();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  //saveData 
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const m = moment();
    const date = new Date()

    let schedule = {
      id: this.f.id.value,
      type: this.f.typeName.value.toLowerCase(),
      description: this.f.description.value,
      createdDate: new Date(m.format('L')),
      active:true
    }


    if (this.scheduleTypeGroup.valid) {

      if(this.scheduleData){
        let _findSchdeuleType = this.scheduleData.filter(sc => sc.id == this.f.id.value);
        if(this.scheduleData == undefined){
          this.saveUpdateSchdule(schedule);
        }else if(_findSchdeuleType && _findSchdeuleType.length == 0){
          this.saveUpdateSchdule(schedule);
        }else{

          let _findSchdeul = this.scheduleData.filter(sc => sc.type == schedule.type);

          if(_findSchdeul.length > 0 && _findSchdeul[0].id != schedule.id){
            MessageAlertDisplay.SuccessToastMessage('Schedule name is already inserted!', false , 'error');
            return;
          }
          this.autenticationService.patchScheduleType(schedule)
          .subscribe(
            data => {
              MessageAlertDisplay.SuccessToastMessage('Schedule Type updated successfully!');
            },
            error => {
              if (error && error.errorStatus) {

              }

              console.log(error);
            },
            () => {
              this.submitted = false;


              this.loadTypeData();
            }

          )
        }


      }
      //var findSchduleType = this.scheduleData.filter(sc => sc.id == this.f.id.value);
      


      // if ((findSchduleType && findSchduleType.length == 0) || this.scheduleData == undefined) {
        
      // } else {
       
      // }

    }



  }

  onClickEditPopUp(data, content) {

    this.scheduleTypeGroup.controls['id'].setValue(data.id);
    this.scheduleTypeGroup.controls['typeName'].setValue(data.type);
    this.scheduleTypeGroup.controls['description'].setValue(data.description);

    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.componentInstance.user = data;

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
    })
  }

  onClickDeleteRow(data) {
  let _isConfirmed = MessageAlertDisplay.confirmationMessage().then((result) => {
    if (result.value ==true) {
      this.autenticationService.inActiveScheduleType(data._id)
    .subscribe(res=>{
      if(res == 1){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    })
    }
  });
  }



    saveUpdateSchdule(schedule){
      this.autenticationService.saveScheduleType(schedule)
      .subscribe(
        data => {

          MessageAlertDisplay.SuccessToastMessage('Schedule Type successfully created');
        },
        error => {
          console.log(error);
          if (error) {
            MessageAlertDisplay.SuccessToastMessage(error.error.message.errorMessage, false , 'error');
          }

          console.log(error);
        },
        () => {
          this.submitted = false;
          this.scheduleTypeGroup.reset();
          this.loadID();
          this.loadTypeData();
        }

      )
    }


}
