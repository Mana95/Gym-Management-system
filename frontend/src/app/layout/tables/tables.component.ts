import { EditItemComponent } from './edit-item/edit-item.component';
import { AuthenticationService } from './../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/services/catagory.service';
import { distinct, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgxPopoverImageModule } from 'ngx-popover-image';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/_models';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  itemData: any;
  closeResult: string;
  itemGroup: FormGroup;
  editItemGroup:FormGroup;
  submitted = false;
  loading = false;
  mainCat: any;
  subcat: any;
  userId: any;
  active = false;
  error = '';
  imageUrl: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
  editFile = true;
  removeUpload = false; image: any;

  states = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
    // tslint:disable-next-line:indent
    'Bahamas (the)', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
    'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina',

  ];
  ArraySelectOption = ['Equipment', 'Nutritions'];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private router: Router,
    private route: ActivatedRoute,
    private autenticationService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get f() {
    return this.itemGroup.controls;
  }

  formatter = (result: string) => result.toUpperCase();

  ngOnInit() {
    this.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
    this.loadData();
  }

  checkDate(event) {
    var date = new Date();
    var fullDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    console.log(fullDate)
    console.log(event.target.value);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  loadData() {
    this.itemGroup = this.formBuilder.group({
      id: [''],
      cat_name: ['', Validators.required],
      item_name: ['', Validators.required],
      description: [''],
      itemType: ['', Validators.required],
      sub_cat: ['', Validators.required],
      importCountry: ['', Validators.required],
    });

   
    this.catagoryService.getItemDetials()
      .subscribe(
        data => {
          console.log(data);
          this.itemData = data;
        },
        error => {
          console.log(error);
        }
      );

    this.catagoryService.getCatNames()
      .subscribe(
        data => {       //  console.log(data)
          this.mainCat = data;
        }
      );
    // Id Gen
    const chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
    const string_length = 8;
    let id = 'IT_' + '';
    for (let i = 0; i < string_length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.userId = id;
      this.itemGroup.controls['id'].setValue(id);
    }
  }

  uploadFile(event) {
    console.log(this.imageUrl);
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
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
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }


  onSubmit(data) {
    console.log(data.value);
    this.submitted = true;
    this.loading = true;
    if (this.itemGroup.valid) {
      
      const itemData = {
        id: this.f.id.value,
        cat_name: this.f.cat_name.value,
        item_name: this.f.item_name.value,
        description: this.f.description.value,
        sub_cat: this.f.sub_cat.value,
        Importered_Country: this.f.importCountry.value,
        image: this.imageUrl,
        itemCreatedName: this.currentUserSubject.value.user_id,
        itemType: this.f.itemType.value,
        itemStatus:true,
        buyingPrice:0
       
      };
      
      this.catagoryService.insertItemData(itemData)
        .subscribe(
          res => {
            console.log(res);

            Swal.fire({
              text: 'Item Update successfully',
              icon: 'success'
            });
            this.modalService.dismissAll();
          },
          error => {
            this.error = error;
            this.loading = false;
          },
          () => {
            this.loadData();
          }

        );
      this.submitted = false;
    }

  }

  getSubCatValue(data) {
    const catName = data.value;
    console.log(catName);
    this.autenticationService.getSubCatNames(catName)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        data => {
          this.subcat = data;
          console.log(data);

        },
        error => {
          console.log(error);
        });

    this.active = true;
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
//open the edit model😍
  openEditModel(rowData){
    
   
    const modelRef = this.modalService.open(EditItemComponent);

    modelRef.componentInstance.user = rowData;
    modelRef.result.then((result) => {
      if (result) {
        this.loadData();
      }
      });

 

  }
  getColor() {}
  onEditSubmit(data){
      this.submitted = true;
      if(this.editItemGroup.valid){

      }else{
        Swal.fire('Oops...', `Please fill the form properly`, 'error');
      }
  }

  //in Active I😄tem 
  inActiveItem(data){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
      this.catagoryService.inActiveItem(data)
      .subscribe(
        result=>{
          console.log(result);
          if(result.ok==1){
           
            this.loadData();
          }else{
  
          }
        }
      )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
     
      }
    })







    

  }

}
