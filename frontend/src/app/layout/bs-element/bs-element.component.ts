import { OrderService } from './../../services/order.service';
import { CatagoryService } from 'src/app/services/catagory.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as moment from 'moment';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { distinct } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';


import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-bs-element',
  templateUrl: './bs-element.component.html',
  styleUrls: ['./bs-element.component.scss'],
  animations: [routerTransition()]
})
export class BsElementComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  purchaseOrderGroup: FormGroup
  closeResult: string;
  poId: any;
  submitted = false;
  loading = false;
  error = '';
  currentDate: any;
  currentTime: any;
  supplierName: any;
  supllierId: any
  supData: any;
  active = false;
  firstName: any;
  lastName: any;
  dataId: any;
  catName: any;
  subcat: any;
  startBuyingPrice: Number;
  activecat = false;
  clickAdd = false;
  alertdisplay = false;
  setValueqty: Number;
  ItemDataValues = [];
  avlbleQuantity = 0;
  pushValue = false;
  PushVaribaleCheck: string;

  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private appRef: ApplicationRef

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    this.purchaseOrderGroup = this.formBuilder.group({
      categoryName: ['', Validators.required],
      quantity: [null, Validators.required],
      itemDetails: ['', Validators.required],
      itemName: [''],
      date: [''],
      itemId: [''],
      itemQty: [''],
      Avlqty: [''],
      supplierFirstName: ['', Validators.required],
      supplierLastName: ['', Validators.required],
      supplierId: ['', Validators.required],
      credentials: this.formBuilder.array([]),
    })
    this.loadFormData();
  }

  loadFormData() {
    let currentMilli = Date.now()
    let today = moment(currentMilli).format("DD-MM-Y");
    this.currentDate = moment().subtract(10, 'days').calendar();
    this.purchaseOrderGroup.controls['date'].setValue(today);
    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'PO_' + '';
    var min = 10000;
    var max = 99999;
    var num = Math.floor(Math.random() * 100000 + 1)
    this.poId = 'PO_' + '' + num;
    this.authenticationService.getAllSuppliers()
      .subscribe(
        data => {
          //   console.log(data);
          this.supllierId = data;

        }
      )

    this.catagoryService.getCatNames()
      .subscribe(
        response => {
          //  console.log(response);
          this.catName = response;
        }
      )
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  display(data) {
    //console.log(data.value);

    this.catagoryService.getItemsDetails(data.value)
      .subscribe(
        data => {

          this.purchaseOrderGroup.controls['itemId'].setValue(data[0].id);
          this.purchaseOrderGroup.controls['itemName'].setValue(data[0].item_name);
          if (data[0].quantity != undefined || data[0].quantity == 0) {
            this.purchaseOrderGroup.controls['Avlqty'].setValue(data[0].quantity);
          } else {
            this.purchaseOrderGroup.controls['Avlqty'].setValue(this.avlbleQuantity);
          }
          this.setValueqty = data[0].quantity;
        },
        error => {
          console.log(error);
        });
  }
  get f() { return this.purchaseOrderGroup.controls; }

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
          //  console.log(data)
        },
        error => {
          //  console.log(error);
        });

    this.active = true
  }

  open(content, supplierName) {
    //alert(content.value);
    console.log(supplierName.value);
    let data = supplierName.value

    this.authenticationService.getReleventSuppliers(data)
      .subscribe(
        response => {
          if (response) {
            //  console.log(response);
            this.supData = response;
            this.active = true;
            if (response == '') {
              alert('Empty')
            }
          }
        },
        error => {
          //  console.log(error);
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

  onClickMe(data, content) {

    let firstName = data.sup_firstName;;
    let lastName = data.sup_lastName;
    let supplierId = data.sup_id;

    this.purchaseOrderGroup.controls['supplierFirstName'].setValue(firstName);
    this.purchaseOrderGroup.controls['supplierLastName'].setValue(lastName);
    this.purchaseOrderGroup.controls['supplierId'].setValue(supplierId);
    //Closed the model
    this.modalService.dismissAll();
  }

  sumValue() {

    let currentQty = Number(this.f.quantity.value);
    let AvlQty = this.f.Avlqty.value;
    console.log(typeof currentQty);

    let final = currentQty + AvlQty;
    if (currentQty !== null) {

      //this.purchaseOrderGroup.controls['quantity'].setValue('');
    }
  }

  resetQuantity() {
    // alert('QQQ');
    //console.log(this.setValueqty);
    this.f.Avlqty.setValue(this.setValueqty);
    //this.purchaseOrderGroup.controls['Avlqty'].setValue(this.setValueqty);
  }

  ChangeQty() {




  }
  get phoneForms() {
    return this.purchaseOrderGroup.get('credentials') as FormArray
  }

  dropDisplayValues() {

    const itemId = this.f['itemId'].value;
    const itemName = this.purchaseOrderGroup.controls['itemName'].value;
    const qty = Number(this.f.quantity.value)
    let AvlQty = this.f.Avlqty.value;
    console.log(itemId);

    let final = AvlQty + qty;
    if (qty !== 0 && itemId !== '' && itemName !== '') {
      //  const creds = this.purchaseOrderGroup.controls.credentials as FormArray;
      const tableValue = this.formBuilder.group({
        itemId: this.f.itemId.value,
        itemName: this.f.itemName.value,
        qty: qty,
        status: 'Pending'
      });
      console.log(tableValue.controls['itemName'].value);

      // const findValue = this.f.credentials.value.find(x=>x.itemId==this.f.itemId.value);

      if (this.f.credentials.value != undefined) {

        this.f.credentials.value.forEach((data, index) => {

          if (this.f.itemId.value == this.f.credentials.value[index].itemId) {
            this.PushVaribaleCheck = this.f.credentials.value[index].itemName;
            const addValue = qty + this.f.credentials.value[index].qty;

            const myForm = (<FormArray>this.purchaseOrderGroup.get("credentials")).at(index);
            myForm.patchValue({
              qty: addValue
            })


            // 
            this.pushValue = true;

            //     this.purchaseOrderGroup.controls['credentials'][index].patchValue([{qty:addValue}])

          }
        })
        if (tableValue.controls['itemName'].value != this.PushVaribaleCheck) {

          this.phoneForms.push(tableValue);
        }

      }





      var siraValue = this.f.credentials.value;
      console.log(siraValue);

      // this.orderService.updatequantity(this.f.Avlqty.value ,itemId ).subscribe(response=>{console.log(response)})

    }
    else {
      this.alertdisplay = true;
    }
    //  console.log(this.ItemDataValues);
  }

  clearAll() {

    if (this.ItemDataValues.length !== 0) {
      this.ItemDataValues.length = 0;
      this.purchaseOrderGroup.controls['Avlqty'].setValue(this.setValueqty);

    } else {
      alert("Your table is already clear")
    }



  }

  deleteRowData(index: number) {
    this.phoneForms.removeAt(index);
  }



  onSubmit() {
    this.submitted = true;
    this.loading = true;

    let purchaseOrderData = {
      purchaseOrderId: this.poId,
      supplierId: this.f.supplierId.value,
      supllierFirstName: this.f.supplierFirstName.value,
      supplierLastName: this.f.supplierLastName.value,
      date: this.currentTime,
      time: this.currentDate,
      categoryName: this.f.categoryName.value,
      status: 'Pending',
      currentUser: this.currentUserSubject.value.username,
      ItemDataValues: this.f.credentials.value
    }
    console.log(purchaseOrderData);

    if (this.purchaseOrderGroup.valid) {
   
      this.orderService.savePurchaseOrderData(purchaseOrderData)
        .subscribe(
          response => {
            if(response ==1){

              Swal.fire({
                text: 'Purchase Order Request send successfully',
                icon: 'success'
              });
              this.submitted = false;
              this.purchaseOrderGroup.reset();
              this.clearFormData();
              this.loadFormData();
            }else{
              Swal.fire('Oops...', `Purchase order send failed `, 'error');
            }
          },
          error => {
            this.error = error;
            this.loading = false;
          }, 
        )
    }else{
      
        Swal.fire('Oops...', `Please make sure to fill the fields `, 'error');
    
    }

  




  }


  clearFormData(){
    let arr1 = <FormArray>this.purchaseOrderGroup.controls['credentials'];
    arr1.clear();

  }
  


}
