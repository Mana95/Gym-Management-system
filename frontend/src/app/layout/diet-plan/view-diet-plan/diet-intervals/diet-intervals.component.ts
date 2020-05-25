import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diet-intervals',
  templateUrl: './diet-intervals.component.html',
  styleUrls: ['./diet-intervals.component.scss'],
  
})
export class DietIntervalsComponent implements OnInit {
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor( private modalService: NgbModal,
    public activeModal: NgbActiveModal,) { }

  ngOnInit() {

    console.log(this.user);
  }
  closeModel(){
    //this.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
    this.activeModal.close();
  }
  
}
