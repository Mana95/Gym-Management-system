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
  name:any;
  powers :any;
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
}
