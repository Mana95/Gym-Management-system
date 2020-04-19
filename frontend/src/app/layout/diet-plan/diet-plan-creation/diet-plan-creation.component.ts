

import { HttpClient } from '@angular/common/http';
import { OrderService } from './../../../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-diet-plan-creation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diet-plan-creation.component.html',
  styleUrls: ['./diet-plan-creation.component.scss']
})
export class DietPlanCreationComponent implements OnInit {



  viewDate: Date = new Date();

  dietPlanRegistration : FormGroup;
  submitted = false;


  constructor(
    private formBuilder : FormBuilder,
    private orderService : OrderService,
    private http : HttpClient,
    private modal: NgbModal
  ) { }


  ngOnInit() {
    this.dietPlanRegistration = this.formBuilder.group({
      id: ['',Validators.required]
    })
  }




  onSubmit(){

  }


}
