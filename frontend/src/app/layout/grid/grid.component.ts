import { CatagoryService } from './../../services/catagory.service';
import { OrderService } from './../../services/order.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';

import { User } from 'src/app/_models';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [routerTransition()]
})
export class GridComponent implements OnInit {
    private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

    grnGroup: FormGroup;

    submitted = false;
    loading = false;
    error = '';
    activeInput = false;

    grnData: any;
    currentDate: any;
    poId: any;
    ItemDataValues: any;
    ItemListArray = [];
    amount: any;
    array: any;
    itemTableArray = [];
    AssignArray = [];
    pushbutton = false;
    disableamount = false;
    TotalAmountArray = [0];



    ItemData: {

            itemId: 'sds',
            itemName: 'sdsds',
            qty: 'sdsd',
            amount: 'sdsd',
            status: 'sdsd',
            price: 'sdsd'


      }[];

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

        this.loadFormData();

    }

    loadFormData() {
        this.grnGroup = this.formBuilder.group({
            grnId: [''],
            date: [''],
            purchaseOrderId: ['', Validators.required],
            supplierId: [''],
            supplierName: [''],
            purchaseOrderDate: [''],
            categoryName: [''],
            grnStatus: [''],
            supplierAdress: [''],
            note: ['', Validators.required],
            totalAmount: [''],
            credentials: this.formBuilder.array([]),
            TableArray: new FormArray([])
        });

         // Id Gen
         const chars = 'ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890';
         const string_length = 8;
         let id = 'GRN_' + '';
         for (let i = 0; i < string_length; i++) {
           const rnum = Math.floor(Math.random() * chars.length);
           id += chars.substring(rnum, rnum + 1);
           this.grnGroup.controls['grnId'].setValue(id);

            this.orderService.getProgressPo()
            .subscribe(
                response => {
                 //   console.log(response);
                    this.poId = response;
                }
            );

         }
         this.currentDate = moment().subtract(10, 'days').calendar();
         this.grnGroup.controls['date'].setValue(this.currentDate);

    }
    createItem() {
        return this.formBuilder.group({
            itemId: [''],
            itemName: [''],
            qty: [''],
            amount: [''],
            status: [''],
            price: new FormArray([])
        });
      }
      get getTable() {
        return this.f.TableArray as FormArray;
      }

      //CALCUATING THE TOTAL OF THE GRN
      changesubTotal(event) {

          const qty = event.value.qty;
          const buyingPrice = Number(event.value.buyingPrice);
          const Total = qty * buyingPrice;
        

          event.value.subTotal = Total;
          const arrayData = this.f.TableArray.value;
        //   this.grnGroup.controls['date'].setValue(this.currentDate);
        let totAmount = 0;
        for (let i = 0 ; i < arrayData.length ; i++) {
          if (arrayData[i].itemId === event.value.itemId ) {

             // assiging a value to formData
             const faControl = (<FormArray>this.grnGroup.controls['TableArray']).at(i);
             faControl['controls'].subTotal.setValue(Total);



          }
          totAmount += arrayData[i].subTotal;
        }
        this.grnGroup.controls['totalAmount'].setValue(totAmount);


        // this.getTable.controls['subTotal'].setValue(Total);
         // this.getTable[i].controls['subTotal'].setValue(Total);

      }

    getPurchaseOrderValue(poData) {
        const control = <FormArray>this.grnGroup.controls['credentials'];
        for (let i = control.length - 1; i >= 0; i--) {
            control.removeAt(i);
        }
        this.itemTableArray.length = 0;
        const id = poData.value;
        this.orderService.getByIdPo(id)
        .subscribe(
            data => {
            // Iniialize the Formtabe Data
                const ItemArray = data[0].ItemDataValues;
                for (let x = 0 ; x < ItemArray.length ; x++) {
                    this.getTable.push(this.formBuilder.group({
                        itemId: [ItemArray[x].itemId],
                        itemName: [ItemArray[x].itemName],
                        qty: [ItemArray[x].qty],
                        status: ['Done'],
                        buyingPrice: ['', Validators.required],
                        subTotal: ['']
                    }));
                }

                const supplierId = data[0].supplierId;
            // getting data
            this.orderService.getSupplieraddress(supplierId)
            .subscribe(
                response1 => {
                   // console.log(response1);
                    this.grnGroup.controls['supplierAdress'].setValue(response1[0].sup_address);
                }
                // End
            );
                this.grnGroup.controls['supplierName'].setValue(data[0].supllierFirstName + ' ' + data[0].supplierLastName );
                this.grnGroup.controls['purchaseOrderDate'].setValue(data[0].time);
                this.grnGroup.controls['supplierId'].setValue(data[0].supplierId);
                this.grnGroup.controls['categoryName'].setValue(data[0].categoryName);
                this.ItemDataValues = data[0].ItemDataValues;
               this.array = data[0].ItemDataValues;
               const creds = this.grnGroup.controls.credentials as FormArray;

                for (let i = 0 ; i < this.array.length ; i++) {
                    const itemId = this.array[i].itemId;
                    const itemName = this.array[i].itemName;
                    const qty = this.array[i].qty;
                    const amount = 0;

                const credentionalArray = <FormArray>this.grnGroup.controls.credentials;

                 const tableData = this.formBuilder.group({
                        itemId: itemId, itemName: itemName , qty: qty , amount: 0 , status: this.array[i].status , price: ['']
                    });

                     this.phoneForms.push(tableData);
                    console.log(this.phoneForms.value);

                }
               console.log('Array');
            }
        );


    }

    onTrackById(index: number, item: FormGroup) {
        return index; // or unique value from {item} something like this (item.get('id').value)
     }

    get phoneForms() {
        return this.grnGroup.get('credentials') as FormArray;
      }

    get f() {
        return this.grnGroup.controls;

      }
      public get currentUserValue(): User {
        return this.currentUserSubject.value;
      }

    onSubmit() {
      
        const arrayItems = this.f.TableArray.value;
        this.submitted = true;
        this.loading = true;
       
        const GRNDATA = {
            id: this.f.grnId.value,
            date: this.f.date.value,
            purchaseOrderId: this.f.purchaseOrderId.value,
            supplierId: this.f.supplierId.value,
            supplierName: this.f.supplierName.value,
            purchaseOrderDate : this.f.purchaseOrderDate.value,
            categoryName: this.f.categoryName.value,
            grnStatus: 'Done',
            supplierAdress: this.f.supplierAdress.value,
            note: this.f.note.value,
            currentUser: this.currentUserSubject.value.username,
            ItemGrnTable: this.f.TableArray.value,
            totalAmount: this.f.totalAmount.value
        };
        console.log(GRNDATA);
        if (this.grnGroup.valid) {
            alert('sdsdsdsds');
             
            const saveGRN =  this.orderService.saveGrnValues(GRNDATA);
            const updatePO =  this.orderService.updatepoStatus(this.f.purchaseOrderId.value);
            const updateQty = this.orderService.updatequantity(arrayItems);

            //group of data subscribe 
          //  https://levelup.gitconnected.com/handle-multiple-api-requests-in-angular-using-mergemap-and-forkjoin-to-avoid-nested-subscriptions-a20fb5040d0c
            forkJoin([saveGRN , updatePO , updateQty]).subscribe(
                result=>{
                    console.log(result[1]);
                    this.grnGroup.reset();
                    this.loadFormData();
                }
            );
        }
    }

}

