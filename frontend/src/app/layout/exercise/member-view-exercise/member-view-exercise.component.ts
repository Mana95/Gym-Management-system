import { ExerciseDetails } from './../../../_models/ExerciseDetails';
import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer ,SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-member-view-exercise',
  templateUrl: './member-view-exercise.component.html',
  styleUrls: ['./member-view-exercise.component.scss']
})
export class MemberViewExerciseComponent implements OnInit {
  excerciseDetails:any;
  name:any;
  powers :any;
  showcomponent = false;
  image:any;
  Steps:any;
  exerciseId:any;
  exerciseName: any;
  exerciseFor: any;
  equipment: any;
  ReferenceLink:any;
  videolink:SafeResourceUrl;
  // set dataOfExercise(){
  //   this.scheduleService.sharedData =this.excerciseDetails;
  // }

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private scheduleService : ScheduleService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer
  ) {
   }

  ngOnInit() {

    this.name = (this.route.snapshot.paramMap.get('name'));
    console.log(this.name);
    this.scheduleService.loadExercise(this.name)
    .subscribe(
      data=>{
        console.log(data);
        this.excerciseDetails = data;
      }
    )
  }

 set exer(data){
    this.scheduleService.sharedData = data;

    // this.router.navigate(['/memberdetailsexercise']);

  }
  getChangeValue(data){

  }
  navigateBack(){
    this.showcomponent = false;
  }
  navigateToPage(data){
    
    this.image = data.imageExercise;
    this.Steps = data.skills;
    console.log(this.image)
    this.exerciseId=data.exerciseId;
    this.exerciseName = data.exerciseName;
    this.exerciseFor = data.exerciseFor;
    this.equipment = data.equipment;
   this.ReferenceLink = data.referenceLink;
    this.showcomponent = true;
  }


  videoPopUp(tempalte , data) {

    this.videolink =  this.sanitizer.bypassSecurityTrustResourceUrl(data.referenceName);
    this.modalService.open(tempalte, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
