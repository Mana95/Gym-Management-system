import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-instructors-edit',
  templateUrl: './instructors-edit.component.html',
  styleUrls: ['./instructors-edit.component.scss']
})
export class InstructorsEditComponent implements OnInit {
id:any;
formData :any;
updateGroup:FormGroup;
submitted = false;
imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
editFile: boolean = true;
removeUpload: boolean = false;
currentTime:any;
currentDate:any; 
locaionPath:any;
FormValue:any;
selectedFile: File
newImage:any;
imageData:any;
dateFieldValid = false;
day:any;
ADD =false;
loading = false;
Type:any;
buttonStatus = false;
  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) { 
   this.id = (this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.updateGroup = this.formBuilder.group({
      id:[''],
      email: ["", [Validators.required, Validators.email]],
      currnetJoinDate: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["",  [Validators.required, Validators.minLength(6)]],
      username: ["", Validators.required],
      phonenumber: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      phonenumber1: ["", [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      birth: ["", Validators.required],
      nicNumber:['' ,[Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],  
      address: ["", Validators.required],
      description:[''],
      typeName:['',Validators.required],
      fileName:[''],
      tickets: new FormArray([]),
      skills: new FormArray([]),
      education: new FormArray([])
    })

    this.setFormField();
    this.getFormData(this.id);
  }
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  
  get E() {
    return this.f.education as FormArray;
  }

  get t() {
     return this.f.tickets as FormArray;
     }

  get S() {
    return this.f.skills as FormArray;
  }   
  get f() {
    return this.updateGroup.controls;
  }

  setFormField(){
    const data = this.formData;
    console.log(data);
   
  }
  getFormData(id) {
    this.authenticationService.getInstructorById(id)
    .subscribe(
      response=>{
        console.log(response);
        const data = response[0];
   
    //setform data
    this.updateGroup.controls['id'].setValue(data.isId);
      this.updateGroup.controls['email'].setValue(data.email);
      this.updateGroup.controls['currnetJoinDate'].setValue(data.joinDate);
      this.updateGroup.controls['firstName'].setValue(data.firstName);
      this.updateGroup.controls['lastName'].setValue(data.lastName);
        this.updateGroup.controls['phonenumber'].setValue(data.phonenumber);
          this.updateGroup.controls['phonenumber1'].setValue(data.phonenumber1);
          this.updateGroup.controls['birth'].setValue(data.birth);
            this.updateGroup.controls['nicNumber'].setValue(data.nicNumber);
            this.updateGroup.controls['address'].setValue(data.address);
            this.updateGroup.controls['description'].setValue(data.description);
            this.updateGroup.controls['fileName'].setValue(data.image);
            this.updateGroup.controls['tickets'].setValue(data.experince);

             this.updateGroup.controls['skills'].setValue(data.skils);
             this.updateGroup.controls['education'].setValue(data.education);

       }
    )
  }

  uploadFile(event) {


    const fileEvnet = event.target.files[0];
    if(fileEvnet){
      this.buttonStatus = true;
    }
    console.log(fileEvnet);
    this.newImage = fileEvnet;
 
    const uploadData = new FormData();
    let fileItem = this.uploader.queue;
    // uploadData.append('file', fileItem);
    this.imageData = event.value;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.updateGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  onKey(event){

    let NICNo  = event.target.value;
   
    var dayText = 0;
    var year = "";
    var month = "";
    var gender = "";
  
      // Year
      if (NICNo.length == 10) {
        year = "19" + NICNo.substr(0, 2);
        dayText = parseInt(NICNo.substr(2, 3));
    
    } else {
        year = NICNo.substr(0, 4);
        dayText = parseInt(NICNo.substr(4, 3));
 
    }
      // Gender
      if (dayText > 500) {
        gender = "Female";
        dayText = dayText - 500;
    } else {
        gender = "Male";
    }
    // Day Digit Validation
    if (dayText < 1 && dayText > 366) {
 
  }else{
     //Month
     if (dayText > 335) {
     this.day = dayText - 335;
      month = "December";
     // console.log(month);
  }
  else if (dayText > 305) {
     this.day = dayText - 305;
      month = "November";
  }
  else if (dayText > 274) {
     this.day = dayText - 274;
      month = "October";
  }
  else if (dayText > 244) {
     this.day = dayText - 244;
      month = "September";
  }
  else if (dayText > 213) {
     this.day = dayText - 213;
      month = "Auguest";
  }
  else if (dayText > 182) {
     this.day = dayText - 182;
      month = "July";
  }
  else if (dayText > 152) {
     this.day = dayText - 152;
      month = "June";
  }
  else if (dayText > 121) {
     this.day = dayText - 121;
      month = "May";
  }
  else if (dayText > 91) {
     this.day = dayText - 91;
      month = "April";
  }
  else if (dayText > 60) {
     this.day = dayText - 60;
      month = "March";
  }
  else if (dayText < 32) {
      month = "January";
     this.day = dayText;
  }
  else if (dayText > 31) {
     this.day = dayText - 31;
      month = "Febuary";
  }
        //show Details;
       
       
        if(this.f.nicNumber.valid){
          this.dateFieldValid = true;
        }else {
          this.dateFieldValid = false;
        }
        let birthday = year+ "-" + month + "-" + this.day
        this.updateGroup.controls['birth'].setValue(birthday);
        this.updateGroup.controls['gender'].setValue(gender);
  
  
  }

  
    
  }

  
  get deleteRow() {
    return this.updateGroup.get('tickets') as FormArray
  }
  onClickTicketsRemove(index){
    
    this.t.removeAt(index);
  }
  onClickSkillsRemove(index){
    this.S.removeAt(index);
  }
  onClickEducationRemove(index){

  
    console.log(index);
    this.E.removeAt(index);
  }

  onClickEducation(e){
    this.submitted = false;
    this.E.push(this.formBuilder.group({
      level: ['',Validators.required],
      college: ['',Validators.required],
      passingyear:['',Validators.required],
  }))
  }

//clear all data inside the array;
  emptyAllArrayFields(){
    while ( this.E.length !== 0) {
      this.E.removeAt(0)
    }
    while ( this.t.length !== 0) {
      this.t.removeAt(0)
    }
    while (  this.S.length !== 0) {
      this.S.removeAt(0)
    }
  
  }

  onClickTickets(e){
    this.ADD = true;
    this.submitted = false;
    this.t.push(this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      empType:['',Validators.required],
      experinceMonth:['',Validators.required],      
      detail:['']
  }));
  }
  onClickSkills(e){
    this.submitted = false;
    this.S.push(this.formBuilder.group({
      skillName:['', Validators.required]
    }));

  }
  //formarray method
  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                title: ['', Validators.required],
                empType:['',Validators.required],
                startDate:['',Validators.required],
                endDate:['',Validators.required],
                detail:['']
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}
  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.updateGroup.reset();
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


  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  onSubmit() {

  }
}
