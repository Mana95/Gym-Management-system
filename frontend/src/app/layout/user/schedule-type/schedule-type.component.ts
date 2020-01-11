import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';

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
  scheduleData:any;

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
      id:[''],
      typeName:['',Validators.required],
      description:['']
    })

 




this.loadTypeData()
//Id Gen

this.loadID();





  }

  loadTypeData() {
    this.autenticationService.getAllSchedule()
    .subscribe(
      data=>{
        this.scheduleData =data
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

    let schedule = {
      id: this.f.id.value,
      type: this.f.typeName.value,
      description:this.f.description.value
    }
    console.log(schedule)
if(this.scheduleTypeGroup.valid){
  this.autenticationService.saveScheduleType(schedule)
  .subscribe(
    data=>{
      console.log(data)
    },
    error=>{
      console.log(error);
    },
    () =>
    {
      this.submitted = false;
     this.scheduleTypeGroup.reset();
     this.loadID();
     this.loadTypeData();
    }

  )
}

    

  }

}
