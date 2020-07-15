import { AuthenticationService } from './../../../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/_models';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Output() usercomment = new EventEmitter();
  @Input() itemId:any;
  submitted = false;
  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  currentDate: any;
  currentTime: any;
  currentUser: User;
  uniqueId: any;
  currentUserRole:any;
  id:any
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
     this.currentUserRole= this.currentUser.role;
    }
  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      rating:['',Validators.required]
     
  });


  }onlyInstructor() {
    return this.currentUserRole
  }
  get f() {
    return this.commentForm.controls;
   }   

  onSubmit() {
    console.log(this.f.rating.value)
    this.submitted = true;
    const comStat = this.f.comment.value
   
    // stop here if form is invalid
    this.currentTime = moment().format('LT');
    this.currentDate = moment().subtract(10, 'days').calendar();
    let Time = this.currentTime
    
    if (this.f.rating.invalid) {
      Swal.fire('Oops...', `Please make rate for your comment`, 'error')
    }else if (this.f.comment.invalid){
      Swal.fire('Oops...', `Please make sure to insert a comment before submit`, 'error')
    }
     else {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        currentTime : Time,
        currentUser : this.currentUser.firstName,
        rating:this.f.rating.value,
        email:this.currentUser.email,
        commentTxt: this.commentForm.controls['comment'].value,
        replyComment: []
      });
      this.usercomment.emit(this.commentInfo);
    }

    let commentData = {

      "itemId": this.itemId,"rating":this.f.rating.value,"email":this.currentUser.email, "firstName": this.currentUser.firstName , "comment": this.f.comment.value, "createDate": this.currentDate, "createdTime": this.currentTime

    }
    if(this.commentForm.valid){
    this.authenticationService.saveComments(commentData)
    .subscribe(
      response=>{
        console.log(response);
      }
    )
  }
    


  }

}
