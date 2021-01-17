import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageAlertDisplay } from 'src/app/common-class/message-alert-display';

@Component({
  selector: 'app-sub-catagory',
  templateUrl: './sub-catagory.component.html',
  styleUrls: ['./sub-catagory.component.scss']
})
export class SubCatagoryComponent implements OnInit {
  mainCat:any;
  catData:any
  closeResult: string;
  subCatagoryResgiter: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  userId:any;

  searchText:any;
  p: number = 1;
  
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subCatagoryResgiter = this.formBuilder.group({
      //sub_catId: ['', Validators.required],
      sub_catName: ['', Validators.required],
      description: ['', Validators.required],
      mainCatgory:['' ,Validators.required ]
    });
    this.loadFormData();

  }
  loadFormData() {
    this.catagoryService.getSubCat()
    .subscribe( 
      res=> {
        console.log(res);
      this.catData =res

      }
    )
    this.catagoryService.getCatNames()
    .subscribe(
      data => {
       this.mainCat = data
        console.log(data);
      }
    );
   this.getId();
  }

    getId() {
  //Id Gen
  var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
  var string_length = 8;
  var id = 'SC_'+'';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    id += chars.substring(rnum,rnum+1);
    this.userId = id;
  }

    }

  get subC() {
    return this.subCatagoryResgiter.controls;
  }

  open(content) {
    this.error = '';
    this.getId();
    this.loadFormData();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }


  onSubmit(userID) {
    this.submitted = true;
    this.loading = true;

    if (this.subCatagoryResgiter.valid) {

      let sub_cat = {
        id: userID.value,
        sub_cat_name: this.subC.sub_catName.value.toLowerCase(),
        description: this.subC.description.value,
        mainCatgory:this.subC.mainCatgory.value
      }
      this.catagoryService.insertSubCat(sub_cat)
      .subscribe(
        data => {
          if(data == 1){
            MessageAlertDisplay.SuccessToastMessage('Sub cataogry inserted succesfully');
            this.subCatagoryResgiter.reset();
            this.submitted = false;
            this.loadFormData();
            this.getId();
            this.modalService.dismissAll();
            
          }else{
       //     this.loadFormData();
            this.getId()
            this.error ='Subcatogory is already inserted for the relevent main catogory'
    
          }
      },
        error => {
          this.error = error;
          this.loading = false;
        });
        this.submitted = false;
   
      //  this.loadFormData()
    }




  }

}
