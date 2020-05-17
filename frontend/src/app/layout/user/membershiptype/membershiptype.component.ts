import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CatagoryService } from 'src/app/services/catagory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { distinct } from 'rxjs/operators';
import { states } from 'src/app/_models/common';

@Component({
  selector: 'app-membershiptype',
  templateUrl: './membershiptype.component.html',
  styleUrls: ['./membershiptype.component.scss']
})
export class MembershiptypeComponent implements OnInit {

  submitted = false;
  loading = false;
  membershipGroup:FormGroup;
  states = states;
  mounthArray = [1,2,3,4,5,6,7,8,9,10,11,12];
  dayArrays = [1,7,14];
  periodType = ['Month to month' , 'year to year' , 'day to day'];
//PeriodTypes
  monthToMonth = false ;
  yearToyear = false;
  dayToDay = false;

  Week1 = false;
  Week2 = false;

  closeResult: string;
  values:any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
    private autenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
this.membershipGroup = this.formBuilder.group({
  membership_type_id:[''],
  typeName:['',Validators.required], 
  month:['',Validators.required],
  membershipCatagory : ['' , Validators.required],
  periodType:['',Validators.required],
  YMDValue: ['' , Validators.required],  
  amount:['', Validators.required],
  note:['', Validators.required]

});

this.AssignData();

  }
  AssignData() {

    

const amount = this.membershipGroup.get('amount');
const years = this.membershipGroup.get('years');
const month = this.membershipGroup.get('month');


amount.valueChanges
.pipe(distinct())
.subscribe(value => amount.setValue(+value || 0));

//get All membershiptype Data
this.autenticationService.getAllMembershipType()
.subscribe(
  response=>{
    this.values = response
  },
  error=>{
    console.log(error);
  }
)


   //Id Gen
 var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
 var string_length = 8;
 var id = 'MT_' + '';
 for (var i = 0; i < string_length; i++) {
   var rnum = Math.floor(Math.random() * chars.length);
   id += chars.substring(rnum, rnum + 1);
  
    this.membershipGroup.controls['membership_type_id'].setValue(id);
 }
  }
//popup warning message
  identifyWeeks(event) {

    const weekTitle = Number(event.target.value);
   console.log(weekTitle);
    switch(weekTitle){
      case this.dayArrays[0]:
        this.Week2 = false;
        this.Week1 = false;
            break
      case this.dayArrays[1]:
      this.Week1 = true;
      this.Week2  = false;
        break;
        case this.dayArrays[2]:
      this.Week2 = true;
      this.Week1 = false;
          break
    }

  }
  
  get f() {

    return this.membershipGroup.controls;

  }
  onChangeCategory(event) {
    const currentValue = event.target.value;

        switch(currentValue){
          case this.periodType[0]:

            this.yearToyear = false;
            this.dayToDay = false;
            this.monthToMonth = true;
            
            break;
            case this.periodType[1]:
              this.dayToDay = false;
              this.monthToMonth = false;
            this.yearToyear = true;
    
            break;
            case this.periodType[2]:
              this.yearToyear = false;      
            this.monthToMonth = false;
            this.dayToDay = true;
            break;
        }
  }

onSubmit() {
    this.submitted = true;
    this.loading = true;
    var amount =  this.f.amount.value.toFixed(2);
   
    let typeData = {
      membership_type_id: this.f.membership_type_id.value,
      membershipName:this.f.typeName.value,
      membershipCatagory : this.f.membershipCatagory.value,
      amount:Number(amount),
      periodType:this.f.periodType.value,
      note:this.f.note.value,
      YMDValue: this.f.YMDValue.value,  
      status:true

    }
    console.log(typeData);

   this.autenticationService.insertMembershipTypeData(typeData)
   .subscribe(
     response=> {
       console.log(response);
     },
     error=>{
       console.log(error);
     },
     ()=>{
       console.log("Your Membership Data is succesfully inserted into Mongodb Collection");
       this.submitted = false;
       this.membershipGroup.reset();
       this.AssignData();
      
     }

   )



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

}
