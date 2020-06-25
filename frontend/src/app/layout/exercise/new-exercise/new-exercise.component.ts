import { ScheduleService } from 'src/app/services/schedule.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';

import * as moment from "moment";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FileUploader } from 'ng2-file-upload';

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
  
  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService : ScheduleService,
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
      exerciseStatus:[''],
      benefits:['', Validators.required],
      skills: new FormArray([]),
      createdDate:['']

    })
    const today = moment();
    this.currentDate = today.format('L');
    
    this.createdName = this.currentUserSubject.value.firstName;
    this.createdId = this.currentUserSubject.value.user_id;


    this.loadNewId();

  }
  get S() {
    return this.f.skills as FormArray;
  }  
  loadNewId(){
    //Id Gen  
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "Exe_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.exerciseGroup.controls["exerciseId"].setValue(id);
    }
     }

     
  get f() {
    return this.exerciseGroup.controls;
  }

  onSubmit(){
   
    var imageArray = [];
    imageArray.length = 0;
    this.submitted = true;
    for (var i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      console.log("Here is the UploadSubmit method" + fileItem);
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }
    for(var j=0;j<this.uploader.queue.length;j++){
      let data = new FormData();
      let reader = new FileReader(); 
      let fileItem = this.uploader.queue[j]._file;
      reader.readAsDataURL(fileItem);
      reader.onload =() =>{
       
        let image = {
          imageName:reader.result
        }
        imageArray.push(image);
      }
      
    }
    console.log(imageArray);
    
    let exerciseData = {
      exerciseId:this.f.exerciseId.value,
      exerciseName:this.f.exerciseName.value,
      exerciseFor:this.f.exerciseFor.value,
      equipment:this.f.equipment.value,
      createdBy:  this.createdName ,
      exerciseStatus:true,
      imageExercise:imageArray,
      benefits:this.f.benefits.value,
      skills:this.f.skills.value,
      createdDate:this.currentDate,
      createdId:this.createdId
    }
    console.log(exerciseData);
    if(this.exerciseGroup.valid){

        this.scheduleService.saveExercise(exerciseData)
        .subscribe(
          response=>{
            console.log(response);
            if(response=1){
              Swal.fire({
                text: 'Exercise Created Success',
                icon: 'success'
              });
           
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


  onClickDescrip(event) {
    this.submitted = false;
    this.S.push(this.formBuilder.group({
      skillName:['', Validators.required]
    }));
  }
  onClickSkillsRemove(index){
    this.S.removeAt(index);
  }
}
