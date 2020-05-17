import { ScheduleService } from 'src/app/services/schedule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-member-details-exercise',
  templateUrl: './member-details-exercise.component.html',
  styleUrls: ['./member-details-exercise.component.scss']
})
export class MemberDetailsExerciseComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService : ScheduleService,
  ) { }

  ngOnInit() {
    const cardDara = this.scheduleService.sharedData;
    console.log(cardDara);
  }

}
