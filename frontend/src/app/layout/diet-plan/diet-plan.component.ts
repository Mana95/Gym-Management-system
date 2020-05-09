import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diet-plan',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss']
})
export class DietPlanComponent implements OnInit {
  dietPlanGroup : FormGroup;
  submitted = false;
  constructor()
{

}
  ngOnInit(){

  }

  onSubmit(){

  }



}

