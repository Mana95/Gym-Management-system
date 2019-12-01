import { AuthenticationService } from './../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
  itemData: any;
  closeResult: string;
  itemGroup: FormGroup;
  submitted = false;
  loading = false;
  mainCat: any;
  subcat: any;
  userId: any;
  active = false;
  error = '';


  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
    private autenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.itemGroup = this.formBuilder.group({
      cat_name: ['', Validators.required],
      item_name:['',Validators.required],
      quantity:['', Validators.required],
      description: ['', Validators.required],
      sub_cat: ['', Validators.required]
    })


    this.catagoryService.getCatNames()
      .subscribe(
        data => {
          //  console.log(data)
          this.mainCat = data;
        }
      )
    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'IT_' + '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.userId = id;

    }


  }
  get f() {

    return this.itemGroup.controls;

  }


  onSubmit(data) {
    this.submitted = true;
    this.loading = true;

    let itemData = {
      id: data.value,
      cat_name: this.f.cat_name.value,
      item_name:this.f.item_name.value,
      quantity:this.f.quantity.value,
      description: this.f.description.value,
      sub_cat:  this.f.sub_cat.value
    }
    console.log(itemData);

    if(this.itemGroup.valid){
      
    this.catagoryService.insertItemData(itemData)
    .subscribe(
      res=>{
        console.log(res);
      },
      error => {
        this.error = error;
        this.loading = false;
      }

    )
    this.submitted = false;
    }

    


  }

  getSubCatValue(data) {
    console.log('TS')
    let catName = data.value;
    console.log(catName)
    this.autenticationService.getSubCatNames(catName)
      .subscribe(
        data => {
          this.subcat = data;
          console.log(data);

        },
        error => {
          console.log(error);
        });

    this.active = true
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

}
