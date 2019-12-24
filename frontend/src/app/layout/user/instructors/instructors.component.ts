import { config } from './../../../config/config';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {



  registrationGroup: FormGroup;
  submitted = false;
  loading = false;
  Type:any;
  imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  editFile: boolean = true;
  removeUpload: boolean = false;
  currentTime:any;
  currentDate:any; 
  locaionPath:any;
  FormValue:any;
  selectedFile: File
  

 


  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder:FormBuilder,
    private authenticationService:AuthenticationService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.registrationGroup = this.formBuilder.group({
      id:[''],
      email: ["", [Validators.required, Validators.email]],
      currnetJoinDate: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["",  [Validators.required, Validators.minLength(6)]],
      username: ["", Validators.required],
      phonenumber: ["", [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      phonenumber1: ["", [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      birth: ["", Validators.required],
      age: ["", Validators.required],
      address: ["", Validators.required],
      description:[''],
      typeName:['',Validators.required],
      fileName:[''],
      experience: new FormArray([])

    })
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "IS_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.registrationGroup.controls["id"].setValue(id);

      this.currentTime = moment().format("LT");
      this.currentDate = moment()
        .subtract(10, "days")
        .calendar();
      this.registrationGroup.controls["currnetJoinDate"].setValue(
        this.currentDate
      );
    }
    this.authenticationService.getAllSchedule()
    .subscribe(
      response=>{
        this.Type = response
        console.log(response);
      }
    )
  }

public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });


  get t() {
    return this.registrationGroup.get('experience') as FormArray
  }
  get f() {

    return this.registrationGroup.controls;

  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.registrationGroup.reset();
    this.t.clear();
}

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
}
  addexperience() {

    const experience = this.formBuilder.group({ 
      title: [],
      company: [],
      employmentType: [],
      description:[]
    })
  
    this.t.push(experience);
  }

  onChangeExperince(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}



  

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  uploadFile(event) {
  
    const uploadData = new FormData();
    let fileItem = this.uploader.queue;
    // uploadData.append('file', fileItem);

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  onSubmit() {
   
  this.submitted= true;
    let data = new FormData();
   // console.log(data)
   let fileItem = this.uploader.queue[0]._file;
   console.log(fileItem);
   data.append('file', fileItem);
   data.append('fileSeq', 'seq' + 0);
  // data.append('dataType', this.registrationGroup.controls.type.value);
    this.submitted = true;
    this.loading = true;
    console.log(this.FormValue);
       
    this.uploadImage(data , this.f.id.value).subscribe(
      (res) => {
        console.log(res)
      //  console.log("This is the reposne " + res);
         //   this.locaionPath = res.path;
      
      }
            );






  }

  uploadImage(data:FormData ,uniqueId): Observable<any> {
    // tslint:disable-next-line:no-debugger
  alert("This is the "+ data);
    return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
    

  }



}
