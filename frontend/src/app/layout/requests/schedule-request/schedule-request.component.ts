import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule-request',
  templateUrl: './schedule-request.component.html',
  styleUrls: ['./schedule-request.component.scss']
})
export class ScheduleRequestComponent implements OnInit {
  pendingSchedule:any;
  closeResult: string;
  rejectedForm :FormGroup;
  submitted = false;
  formData:any;
  pow:any;
  searchText:any;
  p: number = 1;

  showMsg = false;
  constructor(
    private scheduleService:ScheduleService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal,
    private formbuilder:FormBuilder,
  ) { }

  ngOnInit() {

    this.rejectedForm = this.formbuilder.group({
      rejectedReason:['',Validators.required]
    })


    this.loadSchedules();
    
    


  }

  get f() {
    return this.rejectedForm.controls;
  }
  loadSchedules(){
    this.scheduleService.getPendings()
    .subscribe(
      response=>{
        console.log(response);
        this.pendingSchedule = response;
      })
  }

  UpdateRecord(data) {
    console.log(data._id);
    let UpdateData = {
      _id : data._id
    }
    this.scheduleService.updateRecord(UpdateData)
    .subscribe(
      response=>{
        console.log(response);
        this.showMsg = true;

        Swal.fire({
          text: 'Schedule Approved Successfully !',
          icon: 'success'
        });


        setTimeout(()=>{ 
          this.showMsg = false;
          this.loadSchedules();
        }, 2000);
        
      }
    )
  }

  
  RejectRecord(data ,content) {
    this.rejectedForm.controls['rejectedReason'].setValue(null);
    this.submitted = false;
    this.formData = data
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed swith: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('close')
    });

    return;

    // let id  = data._id
    // this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    // .then((confirmed) => {
    //   if(confirmed==true){
    //    alert('User confirmed:')

      
    //   }
    
    // }
    //  )
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

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

  onSubmit() {
    this.submitted = true;
    console.log(this.formData)
    if(this.rejectedForm.valid){
      let reasonData = {
          userId : this.formData.userId,
          Sid :this.formData.Sid,
          scheduleRejectedReason:this.f.rejectedReason.value,
          status:2,
          scheduleActive:false
      }

      this.scheduleService.RejectRecord(this.formData ,reasonData)
        .subscribe(
          response=>{
            console.log(response);
            if(response ==1 ){
              Swal.fire({
                text: 'Schedule Rejected Successfully !',
                icon: 'success'
              });
      
              this.loadSchedules();
              this.modalService.dismissAll()
            }
          }
        )

    }
 

    
  }
}
