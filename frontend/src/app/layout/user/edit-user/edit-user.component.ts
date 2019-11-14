import { User } from './../../../_models/user';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id:any;
  activeStatus: '';
 
  viewForm:FormGroup;
  loading = false;
   error = '';
   submitted = false;

   data = new User();
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.id =  this.id = (this.route.snapshot.paramMap.get('userid'));
    console.log(this.id);
    this.authenticationService.getById(this.id)
    .subscribe(
      data => {
        console.log(data);
        this.data = data;
      }   
    )

  }

  get f() {

    return this.viewForm.controls;

  }

  updateRecords(data , data2,data3) {
  //   alert("This is the value " +this.data.active)
  //   alert(data3.value)
    
  //  alert(data.value);
  //  alert(data2.value);
var id = 'PO' + Math.random().toString(36).substr(2, 9);
var PO_id ='-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9)
console.log(id)
console.log(PO_id);
  }


}
