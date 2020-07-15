import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, Directive, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildboxComponent } from '../childbox/childbox.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})



export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent implements OnInit {
  @Input() postComment: Array<object> = [];
  @Input() itemId:any;
  rating:any;
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];
  commentData: any;
  uniqueId: any;
  currentUserRole:any;
 
  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;
  
  
  constructor(
    private resolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private authenticationService:AuthenticationService
  ) { 
   this.currentUserRole =  this.authenticationService.currentUserValue.role
   console.log('sdaasd')
   console.log(this.currentUserRole)
  }

  ngOnInit() {
    console.log(this.postComment);
    this.commentLoad();
  }

  commentLoad() {
      this.authenticationService.loadCommentDataForId(this.itemId)
      .subscribe(
        result=>{
          console.log('result');
          console.log(result);
          this.commentData = result;
        }
      )
  }

  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
  }

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }
  replyComment(index) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {
          console.log('Piyali=>', data);
          this.receiveReplyComment(data, index);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    console.log($event);
    this.postComment.forEach((element) => {
      if (element['commentId'] === i) {
        element['replyComment'].push(...$event);
        console.log('Main array after reply comment=>', this.postComment);
      }
    });
    console.log(this.reply);
    this.loadComponent = false;
  }

  loadData(rateValue){
    // var newCommentData = [];
    // newCommentData.length = 0;
   var commentDetails = this.commentData
  
    // commentDetails.forEach((cmnt,index)=>{
    //   if(cmnt.rating == Number(rateValue)){
    //     newCommentData.push(cmnt)
    //   }
    // })
    // this.commentData = newCommentData;
    if(rateValue != null){
    var data =   this.commentData.filter(cmnt=> cmnt.rating == Number(rateValue));
    this.commentData = data;
    return;
    }
 this.commentData = commentDetails;



  }
  // commentDataMethod() {
  //     if()
  // }

  onlyInstructor() {
    return this.currentUserRole
  }
}
