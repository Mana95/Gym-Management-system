import { AuthenticationService } from './../../../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/_models';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Output() usercomment = new EventEmitter();
  submitted = false;
  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  currentDate: any;
  currentTime: any;
  currentUser: User;
  uniqueId: any;
  id:any
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
   }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
     
  });

  this.uniqueId = this.authenticationService.cartDataValue[0].itemId;
  console.log('Crt item')
  console.log(this.uniqueId);
  }
  get f() {
    return this.commentForm.controls;
   }   

  onSubmit() {
    this.submitted = true;
    const comStat = this.f.comment.value
   
    // stop here if form is invalid
    this.currentTime = moment().format('LT');
    this.currentDate = moment().subtract(10, 'days').calendar();
    let Time = this.currentTime
    
    if (this.commentForm.invalid) {
      return false;
    }
     else {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        currentTime : Time,
        currentUser : this.currentUser.firstName,
        email:this.currentUser.email,
        commentTxt: this.commentForm.controls['comment'].value,
        replyComment: []
      });
      this.usercomment.emit(this.commentInfo);
    }

    let commentData = {

      "itemId": this.uniqueId, "firstName": this.currentUser.firstName , "comment": this.f.comment.value, "createDate": this.currentDate, "createdTime": this.currentTime

    }

    this.authenticationService.saveComments(commentData)
    .subscribe(
      response=>{
        console.log(response);
      }
    )
    


  }

}
