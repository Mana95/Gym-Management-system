import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CatagoryService } from 'src/app/services/catagory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


import Swal from 'sweetalert2/dist/sweetalert2.js';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  editItemGroup:FormGroup;
  private currentUserSubject: BehaviorSubject<User>;
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public currentUser: Observable<User>;
  imageUrl: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
  submitted = false;
  loading = false;
  ArraySelectOption = ['Equipment', 'Nutritions'];
  states = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
    // tslint:disable-next-line:indent
    'Bahamas (the)', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
    'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina',

  ];
  editFile = true;
  removeUpload = false;
  mainCat:any;
  active = false;
  subcat:any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
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
  formatter = (result: string) => result.toUpperCase();
  ngOnInit() {
    this.editItemGroup = this.formBuilder.group({
      id: [''],
      cat_name: ['', Validators.required],
      item_name: ['', Validators.required],
      description: [''],
      itemType: ['', Validators.required],
      sub_cat: ['', Validators.required],
      importCountry: ['', Validators.required],
      selling_price:['',Validators.required],
      buying_price:[''],
      expDate:['']
    })
    this.editItemGroup.controls['id'].setValue(this.user.id);
    this.editItemGroup.controls['item_name'].setValue(this.user.item_name);
    this.editItemGroup.controls['itemType'].setValue(this.user.itemType);
    this.editItemGroup.controls['importCountry'].setValue(this.user.Importered_Country);
    this.editItemGroup.controls['description'].setValue(this.user.description);
    this.editItemGroup.controls['cat_name'].setValue(this.user.cat_name);
    this.editItemGroup.controls['sub_cat'].setValue(this.user.sub_cat);
    this.editItemGroup.controls['buying_price'].setValue(this.user.buyingPrice);
    if(this.user.selling_price !=undefined){
      this.editItemGroup.controls['selling_price'].setValue(this.user.selling_price);
    }
   
    this.imageUrl=this.user.image;

    this.autenticationService.getSubCatNames(this.user.cat_name)
    .subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        this.subcat = data; 
    });




    this.loadData();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
  get f() {
    return this.editItemGroup.controls;
  }
  loadData(){
    this.catagoryService.getCatNames()
    .subscribe(
      data => {       //  console.log(data)
        this.mainCat = data;
      }
    );
  }
onSubmit() {
  this.submitted = true;

  if(this.editItemGroup.valid){
    const itemData = {
      _id:this.user._id,
      id: this.f.id.value,
      cat_name: this.f.cat_name.value,
      item_name: this.f.item_name.value,
      description: this.f.description.value,
      sub_cat: this.f.sub_cat.value,
      Importered_Country: this.f.importCountry.value,
      image: this.imageUrl,
      itemCreatedName: this.currentUserSubject.value.user_id,
      itemType: this.f.itemType.value,
      selling_price:Number(this.f.selling_price.value)
     
    };

    this.catagoryService.updateItem(itemData)
    .subscribe(
      response=>{
        if(response==1){
          Swal.fire({
            text: 'Item Update successfully',
            icon: 'success'
          });
          this.activeModal.close('Update Done');
        }else{
          Swal.fire('Oops...', `Item Update Failed`, 'error');
        }
      }
    )


  }else{
    Swal.fire('Oops...', `Please fill the form properly`, 'error');
  }




}
passBack() {
  this.passEntry.emit(this.user);
  this.activeModal.close(this.user);
  }

  closeModel(){
    this.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cjGLpeP44cyO-vNJ_y7jhIQL3mDKnuCQWb0Mkb8Hz8YO7wL-Rw&s';
    this.activeModal.close();
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
        this.editItemGroup.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
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
}
