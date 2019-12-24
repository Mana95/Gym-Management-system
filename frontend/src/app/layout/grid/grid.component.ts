import { CatagoryService } from './../../services/catagory.service';
import { OrderService } from './../../services/order.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

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
  
    grnGroup:FormGroup;

    submitted = false;
    loading = false;
    error = '';

    grnData:any;
    currentDate:any;
    poId:any;
    ItemDataValues:any;
    ItemListArray=[];
    amount:any;
    array:any;
    itemTableArray =[]

    pushbutton =false;
    disableamount=false;
    
    

    ItemData : {
      
            itemId: 'sds',
            itemName:'sdsds',
            qty:'sdsd',
            amount:'sdsd',
            status:'sdsd',
            price:'sdsd'
          
        
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
this.grnGroup = this.formBuilder.group({
    grnId:[''],
    date:[''],
    purchaseOrderId:['',Validators.required],
    supplierId:[''],
    supplierName:[''],
    purchaseOrderDate:[''],
    categoryName:[''],
    grnStatus:[''],
    supplierAdress:[''],
    note:['',Validators.required],
    buyingPrice:['', Validators.required],
    totalAmount:[''],
    credentials: this.formBuilder.array([]),
}) 

 //Id Gen
 var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
 var string_length = 8;
 var id = 'GRN_' + '';
 for (var i = 0; i < string_length; i++) {
   var rnum = Math.floor(Math.random() * chars.length);
   id += chars.substring(rnum, rnum + 1);
   this.grnGroup.controls['grnId'].setValue(id);

    this.orderService.getProgressPo()
    .subscribe(
        response=>{
         //   console.log(response);
            this.poId =response;
        }
    )

 }
 this.currentDate = moment().subtract(10, 'days').calendar();
 this.grnGroup.controls['date'].setValue(this.currentDate);

    }

    createItem() {
        return this.formBuilder.group({
            itemId: [''],
            itemName:[''],
            qty:[''],
            amount:[''],
            status:[''],
            price:['']
        })
      }


    getPurchaseOrderValue(poData) {
        this.itemTableArray.length = 0;
        let id = poData.value;
        this.orderService.getByIdPo(id)
        .subscribe(
            data=>{

            let supplierId = data[0].supplierId;
            this.orderService.getSupplieraddress(supplierId)
            .subscribe(
                response1 =>{
                    console.log(response1);
                    this.grnGroup.controls['supplierAdress'].setValue(response1[0].sup_address);

                }
            )

                //console.log(data)
                this.grnGroup.controls['supplierName'].setValue(data[0].supllierFirstName +" "+ data[0].supplierLastName );
                this.grnGroup.controls['purchaseOrderDate'].setValue(data[0].time);
                this.grnGroup.controls['supplierId'].setValue(data[0].supplierId);
                this.grnGroup.controls['categoryName'].setValue(data[0].categoryName);
                this.ItemDataValues = data[0].ItemDataValues;
               this.array = data[0].ItemDataValues;
               const creds = this.grnGroup.controls.credentials as FormArray;
             
                for(var i=0 ; i< this.array.length ; i++){
                    let itemId = this.array[i].itemId;
                    let itemName = this.array[i].itemName;
                    let qty = this.array[i].qty;
                    let amount = 0;

                let credentionalArray = <FormArray>this.grnGroup.controls.credentials;    

                 const tableData = this.formBuilder.group({
                        itemId:itemId, itemName:itemName ,qty:qty , amount:0 ,status: this.array[i].status ,price:""
                    });

                    this.phoneForms.push(tableData);


                }
               console.log('Array');
            }
        )


    }

    onTrackById(index: number, item: FormGroup) {
        return index; // or unique value from {item} something like this (item.get('id').value)
     }

    get phoneForms() {
        return this.grnGroup.get('credentials') as FormArray
      }

    //push array method
    pushValue(index:number) {

       // console.log(this.phoneForms.value[index]);
        let priceValue = this.phoneForms.value[index].price
        let priceConvert = Number(priceValue)
        let amount = Number(this.phoneForms.value[index].qty);

        let amountFinal = amount*priceConvert;
        console.log(amount)
        this.phoneForms.value[index].amount = amountFinal;
        
        let total =+ amountFinal;
         ;
        this.grnGroup.controls['totalAmount'].setValue(total);
        // this.disableamount = true;
        // let id = data.itemId;
        // let name = data.itemName;
        // let qty = data.qty;
        // let status = 'Approved';
        // let price = Number(this.grnGroup.controls.buyingPrice.value);
        // let amountVal = Number(price.toFixed(2));
        // console.log(typeof amountVal)
        
        // let realnumber =qty*price;

        //     //   console.log(price.toFixed(2));
        //     data.amount = realnumber.toFixed(2);

        // let ItemDetails = {
        //     itemId : id, itemName:name ,qty:qty , status: status , buyingPrice:Number(amountVal.toFixed(2))
        //   }
        //   console.log(ItemDetails); 
        //   if(id!==''&& name!=='' && qty!==0 && status!== ''&& price!==0){
        //     this.ItemListArray.push(ItemDetails); //push data into the array
        //     data.status = 'Approved';
        //   }
    }

    get f() {

        return this.grnGroup.controls;
    
      }
      public get currentUserValue(): User {
        return this.currentUserSubject.value;
      }

    onSubmit() {

        this.submitted = true;
        this.loading = true;

        let GRNDATA = {
            id: this.f.grnId.value,
            date:this.f.date.value,
            purchaseOrderId: this.f.purchaseOrderId.value,
            supplierId: this.f.supplierId.value,
            supplierName: this.f.supplierName.value,
            purchaseOrderDate : this.f.purchaseOrderDate.value,
            categoryName: this.f.categoryName.value,
            grnStatus: 'Done',
            supplierAdress:this.f.supplierAdress.value,
            note: this.f.note.value,
            currentUser:this.currentUserSubject.value.username,
            ItemGrnTable: this.ItemListArray,
            totalAmount:this.f.totalAmount.value
           

        }
        console.log(GRNDATA);

        this.orderService.saveGrnValues(GRNDATA)
        .subscribe(
            response=>{
                console.log(response);
            },
            error=>
            {
                console.log(error);

            },
            () =>{
                console.log("Insert GRN Succesfully");
            }
        )


        this.orderService.updatepoStatus(this.f.purchaseOrderId.value)
        .subscribe(
            response=>{console.log(response)},error=>console.log(error) , ()=>console.log("Update the Purchase OrderId")
        )

       for(var x =0 ; x<this.ItemListArray.length; x++){

        let arrayData = {
            itemId:this.ItemListArray[x].itemId,
            qty:this.ItemListArray[x].qty

        }

           this.orderService.updatequantity(arrayData)
           .subscribe(
               response=>{
                   console.log(response);
               },
               error=>{
                   console.log(error);
               },
               ()=>{
                console.log('Item Insert Successfully');

               }
           )
       }



    }

}
