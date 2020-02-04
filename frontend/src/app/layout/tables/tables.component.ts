import { AuthenticationService } from './../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';
import { distinct } from 'rxjs/operators';
import {NgxPopoverImageModule} from 'ngx-popover-image';

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
  imageUrl: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
  editFile: boolean = true;
  removeUpload: boolean = false;
  image:any;



  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
    private autenticationService: AuthenticationService,

    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.loadData();

  }
  loadData() {

    this.itemGroup = this.formBuilder.group({
      id:[''],
      cat_name: ['', Validators.required],
      item_name: ['', Validators.required],
      quantity: [null, Validators.required],
      description: [''],
      itemType:['',Validators.required],
      sub_cat: ['', Validators.required],
      selling_price: ['', Validators.required],
      importCountry:['' , Validators.required],
      manuDate:[''],
      expDate:['']
    });

    const qty = this.itemGroup.get('quantity');
    const sellingPrice = this.itemGroup.get('selling_price');
    const buying_price = this.itemGroup.get('buying_price');

    qty.valueChanges
      .pipe(distinct())
      .subscribe(value => qty.setValue(+value || 0));

    sellingPrice.valueChanges
      .pipe(distinct())
      .subscribe(value => sellingPrice.setValue(+value || 0));


    this.catagoryService.getItemDetials()
    .subscribe(
      data=>{
        console.log(data)
        this.itemData=data;
      },
      error=> {
        console.log(error)
      }
    )


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
      this.itemGroup.controls['id'].setValue(id);


    }


  }

  get f() {

    return this.itemGroup.controls;

  }

  uploadFile(event) {
    console.log(this.imageUrl);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.itemGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


  onSubmit(data) {
    console.log(data.value)
    this.submitted = true;
    this.loading = true;
    // var selValue = this.f.selling_price.value.toFixed(2);
    
    // console.log(typeof selValue);
  
   
    if (this.itemGroup.valid) {
      var selValue = this.f.selling_price.value.toFixed(2);
    

      let itemData = {
        id: this.f.id.value,
        cat_name: this.f.cat_name.value,
        item_name: this.f.item_name.value,
        quantity: this.f.quantity.value,
        description: this.f.description.value,
        sub_cat: this.f.sub_cat.value,
        selling_price: Number(selValue),
        Importered_Country: this.f.importCountry.value,
        image: this.imageUrl,
        itemType: this.f.itemType.value,
        manuDate:this.f.manuDate.value,
        expDate:this.f.expDate.value

      }

      console.log(itemData);
      this.catagoryService.insertItemData(itemData)
        .subscribe(
          res => {
            console.log(res);
          },
          error => {
            this.error = error;
            this.loading = false;
          },
          ()=>{
            this.loadData();
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
