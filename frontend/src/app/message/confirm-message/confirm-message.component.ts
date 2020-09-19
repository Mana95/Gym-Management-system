import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.scss']
})
export class ConfirmMessageComponent implements OnInit {
  @Input() displayMessage:string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }


  onclick(event) {

    if(event == 'yes'){
      this.activeModal.dismiss('Cross click')
    }else{
      this.activeModal.dismiss()
    }

  }

}
