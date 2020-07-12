import { CatagoryService } from './../../../../services/catagory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  userId : any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.catagoryResgiter = this.formBuilder.group({
      //catId:['', Validators.required],
      catName:['', Validators.required],
      description: ['', Validators.required]
    });
this.loadingId();
  
 

  }

  loadingId(){
       //Id Gen
       var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
       var string_length = 8;
       var id = 'MC_'+'';
       for (var i=0; i<string_length; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         id += chars.substring(rnum,rnum+1);
         this.userId = id;
   
       }
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


  onSubmit(userID) {
    this.submitted = true;
    this.loading = true;
    console.log("Hey There")
if(this.catagoryResgiter.valid) {
  let mainCatData = {
    id : userID.value,
    cat_name: this.mc.catName.value,
    description: this.mc.description.value
  }

  //data passing to the services
  this.catagoryService.insertMainCat(mainCatData)
  .subscribe(
    data => {
   this.activeModal.close('Update Done');
    console.log(data);
  },
    error => {
      this.error = error;
      this.loading = false;
    },
    () =>{
      this.submitted = false;
      this.catagoryResgiter.reset();
      this.activeModal.close('Update Done');
      this.loadingId();
    });
    




}

  }

  closeModel(){
    //this.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
    this.activeModal.close();
  }
  
}
