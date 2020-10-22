import { ScheduleService } from 'src/app/services/schedule.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';

import * as moment from "moment";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FileUploader } from 'ng2-file-upload';
import { config } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})

export class NewExerciseComponent implements OnInit {
  exerciseGroup:FormGroup;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  submitted =false;
  createdName : string;
  createdId : string;
  currentDate:any;
  locaionPath: any;
  imageUrl: string | ArrayBuffer;
  uploadButtonStatus = false;
  selectOption= ['Abs Exercises' ,'Back Exercises','Chest Exercises', 'Legs Exercises','Shoulder Exercises','Biceps Exercises','Triceps Exercises'];
  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService : ScheduleService,
    private http: HttpClient,
  ) {
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
   public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  ngOnInit() {
    this.exerciseGroup = this.formBuilder.group({
      exerciseId :[''],
      exerciseName:['' , Validators.required],
      exerciseFor:['', Validators.required],
      equipment:['' ],
      createdBy:[''],
      jobname:[''],
      exerciseStatus:[''],
      benefits:['', Validators.required],
      skills: new FormArray([]),
      exerciseImageLocation: new FormArray([]),
      referenceLink: new FormArray([]),
      createdDate:[''],
      exerciseGender:['',Validators.required]

    })
    const today = moment();
    this.currentDate = today.format('L');
    
    this.createdName = this.currentUserSubject.value.firstName;
    this.createdId = this.currentUserSubject.value.user_id;


    this.loadNewId();

  }



  RemoveItem(item){
    item.remove();
    if(this.uploader.queue.length == 0){
      this.uploadButtonStatus = false;
    }
  }

  get S() {
    return this.f.skills as FormArray;
  }  

  get reference() {
    return this.f.referenceLink as FormArray;
  }
  get exe() {
    return this.f.exerciseImageLocation as FormArray;
  }
  loadNewId(){
    //Id Gen  
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "Exe_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      
    }
    this.exerciseGroup.controls["exerciseId"].setValue(id);
     }

     
  get f() {
    return this.exerciseGroup.controls;
  }

  onSubmit(){
    this.uploadButtonStatus =true
    var imageArray = [];
    imageArray.length = 0;
    this.submitted = true;
    for (var i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      console.log("Here is the UploadSubmit method" + fileItem);
      if (fileItem.size > 10000000) {
       
          Swal.fire('Oops...', `Each File should be less than 10 MB of size.`, 'error');
   
        return;
      }
    }
    for(var j=0;j<this.uploader.queue.length;j++) {
      let reader = new FileReader(); 
      let fileItem = this.uploader.queue[j]._file;
      imageArray.push(fileItem);
      let data = new FormData();
      reader.readAsDataURL(fileItem);
      reader.onload =(event:any) =>{
      //  console.log(event.target.result);
        this.imageUrl = event.target.result;
        this.exe.push(this.formBuilder.group({
          imageName: this.imageUrl,
        }));
      }
  
     const imageIpload =  this.uploadAPIImage(data , this.f.exerciseId.value).subscribe(
        res =>{
       //   console.log(res.path);
          // this.exe.push(this.formBuilder.group({
          //       imageName: res.path
          //     }));
        }
      )

       //this.sa
    }
    
  
//this.SaveExerciseData();

  
  }

  SaveExerciseData() {
    this.submitted = true;
    if(this.f.skills.value ==''){
      Swal.fire('Oops...', `Please mention about the exercise steps!`, 'error');
      return;
    }
    if(this.f.referenceLink.value == ''){
      Swal.fire('Oops...', `Reference link can not be empty,Please add some relevent link/'s`, 'error');
      return;
    }

    if(this.uploadButtonStatus==false){
      Swal.fire('Oops...', `Please upload the images!`, 'error');
      return;
    }
    let exerciseData = {
      exerciseId:this.f.exerciseId.value,
      exerciseName:this.f.exerciseName.value,
      exerciseFor:this.f.exerciseFor.value,
      equipment:this.f.equipment.value,
      createdBy:  this.createdName ,
      exerciseStatus:true,
      imageExercise:this.f.exerciseImageLocation.value,
      benefits:this.f.benefits.value,
      skills:this.f.skills.value,
      createdDate:this.currentDate,
      createdId:this.createdId,
      exerciseGender:this.f.exerciseGender.value,
      referenceLink:this.f.referenceLink.value
    }
    console.log(exerciseData);
    if(this.exerciseGroup.valid){

        this.scheduleService.saveExercise(exerciseData)
        .subscribe(
          response=>{
            console.log(response);
            if(response=1){
              this.loadNewId();
              Swal.fire({
                text: 'Exercise Created Success',
                icon: 'success'
              });
              this.uploader.clearQueue();
              this.submitted = false;
            this.loadNewId();
              this.exerciseGroup.reset();
            }else{
              Swal.fire('Oops...', `Exercise Name is already inserted`, 'error')
            }
          }
        )




    }else{
      Swal.fire('Oops...', `Please fill the field properly!`, 'error')
    }
  }
  onClickReference(event){
    this.submitted = false;
    this.reference.push(this.formBuilder.group({
      referenceName:['', Validators.required]
    }));
  }
  onClickReferenceRemove(index) {
    this.reference.removeAt(index);
  }
  onClickDescrip(event) {
    this.submitted = false;
    this.S.push(this.formBuilder.group({
      skillName:['', Validators.required]
    }));
  }
  onClickSkillsRemove(index){
    this.S.removeAt(index);
  }

  uploadFile(event) {
    // tslint:disable-next-line:no-debugger
  //  alert("This is the "+uniqueId);
    //return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
    

  }

 uploadAPIImage(data: FormData, uniqueId: any): Observable<any> {
  // tslint:disable-next-line:no-debugger
//  alert("This is the "+uniqueId);
  return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);
  
}

clearQueue() {
  this.uploader.clearQueue();
  this.uploadButtonStatus = false;
  // if(this.uploader.queue.length == 0){
  //   this.uploadButtonStatus = false;
  // }
}

}
