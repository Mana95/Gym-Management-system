import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';

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
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
     
      
    this.subCatagoryResgiter = this.formBuilder.group({
      sub_catId: ['', Validators.required],
      sub_catName: ['', Validators.required],
      description: ['', Validators.required],
      mainCatgory:['' ,Validators.required ]
    });

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
    

  }

  get subC() {
    return this.subCatagoryResgiter.controls;
  }

  open(content) {
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


  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.subCatagoryResgiter.valid) {

      let sub_cat = {
        id: this.subC.sub_catId.value,
        sub_cat_name: this.subC.sub_catName.value,
        description: this.subC.description.value,
        mainCatgory:this.subC.mainCatgory.value
      }
      this.catagoryService.insertSubCat(sub_cat)
      .subscribe(
        data => {
        console.log(data);
      },
        error => {
          this.error = error;
          this.loading = false;
        });
        this.submitted = false;
      this.subCatagoryResgiter.reset();
      location.reload();
    }




  }

}
