import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-veiw-schedule',
  templateUrl: './veiw-schedule.component.html',
  styleUrls: ['./veiw-schedule.component.scss']
})
export class VeiwScheduleComponent implements OnInit {
  AcceptedSchedule:any;
  constructor(
    private scheduleService:ScheduleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.scheduleService.getAcceptedSchedule()
    .subscribe(
      response=>{
        this.AcceptedSchedule = response;
      }
    )
  }

  routePage(data) {
    console.log(JSON.stringify(data));
    this.router.navigate(['/acceptedSchedule', data.membershipId]);
    console.log("Navigate to Edit Group " + data.membershipId);
  }

}
