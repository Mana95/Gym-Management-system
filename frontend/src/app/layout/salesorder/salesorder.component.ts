import { NumberDirective } from './../../_directives/numbers-only.directive';
import { CatagoryService } from './../../services/catagory.service';
import { AuthenticationService } from './../../services/authentication.service';
import { OrderService } from './../../services/order.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';

import * as moment from 'moment';

@Component({
  selector: 'app-salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.scss'],

})
export class SalesorderComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  salesOrderGroup:FormGroup;
  closeResult: string;
  customerData:any;
  submitted = false;
  loading = false;
  error = '';
  subcat:any;
  currentDate:any;
  activecat = false;
  active =false;
  catName: any;
  alertdisplay = false;

  setValueqty:any;

  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  
  }

  ngOnInit() {
    this.salesOrderGroup = this.formBuilder.group({
      id:[''],
      categoryName: ['', Validators.required],
      date:[''],
      quantity: [null, Validators.required],
      itemDetails:['',Validators.required],
      itemName: ['',],
      itemId:[''],
      itemQty:[''],
      Avlqty:[''],
      customerfirstName:['', Validators.required],
      customerLastName : ['', Validators.required],
      customerId: ['', Validators.required],
      credentials: this.formBuilder.array([]),
  
  
  }) 
  this.currentDate = moment().subtract(10, 'days').calendar();
  let date = this.currentDate;
  this.salesOrderGroup.controls['date'].setValue(date);
  
  this.catagoryService.getCatNames()
  .subscribe(
    response => {
      this.catName = response;
    }
  )




 //Id Gen
 var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
 var string_length = 8;
 var id = 'SO_' + '';
 for (var i = 0; i < string_length; i++) {
   var rnum = Math.floor(Math.random() * chars.length);
   id += chars.substring(rnum, rnum + 1);
 
   this.salesOrderGroup.controls['id'].setValue(id);

 

 
     




  }



  }
  get phoneForms() {
    return this.salesOrderGroup.get('credentials') as FormArray
  }

  
  deleteRowData(index: number) {
    this.phoneForms.removeAt(index);
  }
  
  display(data) {
    //console.log(data.value);

    this.catagoryService.getItemsDetails(data.value)
      .subscribe(
        data => {
        
          this.salesOrderGroup.controls['itemId'].setValue(data[0].id);
          this.salesOrderGroup.controls['itemName'].setValue(data[0].item_name);
          this.salesOrderGroup.controls['Avlqty'].setValue(data[0].quantity);
        //  this.purchaseOrderGroup.controls['buying_price'].setValue(data[0].buying_price)
          this.setValueqty =  data[0].quantity;
         // this.startBuyingPrice = data[0].buying_price;

        },
        error => {
          console.log(error);
        });



  }

  
  dropDisplayValues() {
   


    const itemId = this.f['itemId'].value;
    const itemName = this.salesOrderGroup.controls['itemName'].value;
    const qty = Number(this.f.quantity.value)
    let AvlQty = this.f.Avlqty.value;
    console.log(itemId);
   
    let final = AvlQty + qty;    
    if(qty!== 0 && itemId !== '' && itemName !=='')  {
    //  const creds = this.purchaseOrderGroup.controls.credentials as FormArray;
     const tableValue = this.formBuilder.group({
        itemId: this.f.itemId.value,
        itemName: this.f.itemName.value,
        qty:qty,
        status: 'Pending'
      });
    //this.purchaseOrderGroup.controls['Avlqty'].setValue(final);
    // this.ItemDataValues.push(ItemDetails);
    this.phoneForms.push(tableValue);

    var siraValue = this.f.credentials.value;
    console.log(siraValue);

      // this.orderService.updatequantity(this.f.Avlqty.value ,itemId ).subscribe(response=>{console.log(response)})
        
  }
  else {
    this.alertdisplay = true;
  }
  //  console.log(this.ItemDataValues);
  }


  onClickMe(data, content) {

    let firstName = data.firstName;;
    let lastName = data.lastName;
    let customerId = data.id;

    this.salesOrderGroup.controls['customerfirstName'].setValue(firstName);
    this.salesOrderGroup.controls['customerLastName'].setValue(lastName);
    this.salesOrderGroup.controls['customerId'].setValue(customerId);
    //Closed the model
    this.modalService.dismissAll();
  }

  get f() {

    return this.salesOrderGroup.controls;

  }
  getCatValue(data) {
    console.log('TS')
    let catName = data.value;
    console.log(catName)
    this.catagoryService.getchoosenItems(catName)
      .subscribe(
        data => {
         // console.log(data);
          this.subcat = data;
          this.activecat = true;
        //  console.log(data);

        },
        error => {
        //  console.log(error);
        });

    this.active = true
  }

  open(content, customerName) {
    //alert(content.value);
    
    console.log(customerName.value);
    let data = customerName.value

    this.authenticationService.getRelventCustomer(data)
    .subscribe(
      response=>{
        console.log(response);
        this.customerData= response;

      }
    )


    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
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

  }

}
