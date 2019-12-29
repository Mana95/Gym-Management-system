import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  RoleGroup:FormGroup
  id:any;
  submitted = false
  
  constructor(private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.RoleGroup = this.formBuilder.group({
      id:[''],
      name:[''],
      description:[''],
      role:['',Validators.required],
      changeRole:[''],
      email:['']
    })
    

    this.id = (this.route.snapshot.paramMap.get('roleId'));
    console.log("This is the ngOnInit" + this.id);
    this.authenticationService.getReleventRoledata(this.id)
    .subscribe(
      response=>{
        let id = response[0].user_id
   
        let name = response[0].firstName
        let changeRole = response[0].role
        console.log(changeRole);
        this.RoleGroup.controls['id'].setValue(id);
        this.RoleGroup.controls['name'].setValue(name);
        this.RoleGroup.controls['role'].setValue(response[0].role);
        this.RoleGroup.controls['email'].setValue(response[0].email);
     



      //  this.purchaseOrderGroup.controls['supplierId'].setValue(supplierId);
      }
    )
  }
  get f() {
    return this.RoleGroup.controls;
  }
  changeRole(event){
    let curruntRole = event.target.value;

    this.RoleGroup.controls['role'].setValue(curruntRole);
  }
  onSubmit() {

    let roleData ={
      id : this.id , 
      role:this.f.role.value
    }
    this.authenticationService.updateRole(roleData)
    .subscribe(
      data=>{
        console.log(data)
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log('Updated');
      }
    )

  }
}
