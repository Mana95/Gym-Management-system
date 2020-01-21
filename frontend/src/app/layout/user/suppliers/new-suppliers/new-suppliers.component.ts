import { PasswordStrengthValidator } from './../../../../_models/password-strength.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-suppliers',
  templateUrl: './new-suppliers.component.html',
  styleUrls: ['./new-suppliers.component.scss']
})
export class NewSuppliersComponent implements OnInit {
  supRegister:FormGroup;
  submitted = false;
  loading = false;
  error = '';
  userId : any;
  sendMails:any;
  constructor( 
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.supRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      nicNumber:['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      username:['', [Validators.required]],
      company:[''],
      password: ['', [Validators.required, PasswordStrengthValidator]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      phonenumber1:['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      description:['',  Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'SUP_'+'';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum,rnum+1);
      this.userId = id;

    }
  }

  //formconctroller
  get f() {

    return this.supRegister.controls;

  }

  //validation the phone number
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  onSubmit(userID ,content ,contentDone) {
    this.submitted = true;
    this.loading = true;
     let sup_data = {
      sup_id: userID.value,
      sup_firstName: this.f.firstName.value,
      sup_lastName:this.f.lastName.value,
      sup_username:this.f.username.value,
      sup_nicNumber:this.f.nicNumber.value,
      sup_company:this.f.company.value,
      sup_address:this.f.address.value ,
      sup_phonenumber:this.f.phonenumber.value,
      sup_phonenumber1:this.f.phonenumber1.value,
      sup_description:this.f.description.value,
      sup_email:this.f.email.value,
      active:true,
      role:'Supplier'
    }
    let UserData = {
      user_id:userID.value,
      firstName: this.f.firstName.value,
      username:this.f.username.value,
      email:this.f.email.value,
      password:this.f.password.value,
      active:true,
      role:'Supplier'
    }

    let mailData= {
      username:this.f.username.value,
      password:this.f.password.value,
      mail:this.f.email.value
    }

    console.log(sup_data)
    if(this.supRegister.valid){
      alert('Valid');
      this.authenticationService.registerSupplier(sup_data).pipe(
        map(supplierData=>{
          const supplier = supplierData;
          console.log(supplier);
          return supplier; 
        }),
        mergeMap( user =>{
          const posts = this.authenticationService.userCreationPub(UserData);   
          const sendMails = this.authenticationService.SendSupplierMail(mailData)      
          return forkJoin([posts , sendMails]);
        })
      ).subscribe(
        results=>{
          this.sendMails = results[1];
          let result1 = results[0];
          console.log(this.sendMails);
          console.log('ALL DONE');
          console.log(results[0]);
          this.ConfermationModal(content ,contentDone,result1,this.sendMails)

        }
      )

    
        alert("Register succeeded");
        this.submitted = false;
  
        this.supRegister.reset();

    }
    else {
      alert("Fields are not required");
    }

  }

    ConfermationModal(content ,contentDone, result1 , result2){
        if(result1==1 && result2==1){
          this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
        }else {
          this.modalService.open(contentDone, {backdropClass: 'light-blue-backdrop'});
        }
    }

}
