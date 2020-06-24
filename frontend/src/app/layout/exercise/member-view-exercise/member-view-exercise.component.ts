import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-view-exercise',
  templateUrl: './member-view-exercise.component.html',
  styleUrls: ['./member-view-exercise.component.scss']
})
export class MemberViewExerciseComponent implements OnInit {
  excerciseDetails:any;
  id:any;
  // set dataOfExercise(){
  //   this.scheduleService.sharedData =this.excerciseDetails;
  // }

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private scheduleService : ScheduleService,
  ) {
   }

  ngOnInit() {

    this.id =  this.id = (this.route.snapshot.paramMap.get('name'));
    console.log(this.id);
    // this.scheduleService.loadExercise()
    // .subscribe(
    //   data=>{
    //     this.excerciseDetails = data;
    //   }
    // )
  }

 set exer(data){
    this.scheduleService.sharedData = data;

    // this.router.navigate(['/memberdetailsexercise']);

  }

}
