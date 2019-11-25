import { CatagoryService } from './../../../../services/catagory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-new-catagory',
  templateUrl: './main-new-catagory.component.html',
  styleUrls: ['./main-new-catagory.component.scss']
})
export class MainNewCatagoryComponent implements OnInit {
  closeResult: string;
  catagoryResgiter: FormGroup;
  submitted = false;
  loading = false;
  error = '';


  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.catagoryResgiter = this.formBuilder.group({
      catId:['', Validators.required],
      catName:['', Validators.required],
      description: ['', Validators.required]
    });

  }

  get mc() {
    return this.catagoryResgiter.controls;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log("Hey There")
if(this.catagoryResgiter.valid) {
  let mainCatData = {
    id : this.mc.catId.value,
    cat_name: this.mc.catName.value,
    description: this.mc.description.value
  }

  //data passing to the services
  this.catagoryService.insertMainCat(mainCatData)
  .subscribe(
    data => {
    console.log(data);
  },
    error => {
      this.error = error;
      this.loading = false;
    });
    this.submitted = false;
  this.catagoryResgiter.reset();




}

  }


}
