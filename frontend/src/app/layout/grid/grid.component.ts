import { CatagoryService } from './../../services/catagory.service';
import { OrderService } from './../../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [routerTransition()]
})
export class GridComponent implements OnInit {
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

    constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) {}

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
    buyingPrice:['', Validators.required]


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

                for(var i=0 ; i< this.array.length ; i++){
                    let itemId = this.array[i].itemId;
                    let itemName = this.array[i].itemName;
                    let qty = this.array[i].qty;
                    let amount = 0;

                    let arrayList = {
                        itemId:itemId , itemName:itemName ,qty:qty , amount:amount ,status: this.array[i].status
                    }
                    this.itemTableArray.push(arrayList)

                }
               console.log('Array')
                console.log(this.itemTableArray);
            //    this.amount = 0;

            }
        )


    }
    //push array method
    pushValue(data) {
        let id = data.itemId;
        let name = data.itemName;
        let qty = data.qty;
        let status = 'Approved';
     

        let price = Number(this.grnGroup.controls.buyingPrice.value);
        let amountVal = Number(price.toFixed(2));
        console.log(typeof amountVal)
        
        let realnumber =qty*price;

            //   console.log(price.toFixed(2));
            data.amount = realnumber.toFixed(2);

        let ItemDetails = {
            itemId : id, itemName:name ,qty:qty , status: status , buyingPrice:amountVal.toFixed(2)
          }
          console.log(ItemDetails); 
          if(id!==''&& name!=='' && qty!==0 && status!== ''&& price!==0){
            this.ItemListArray.push(ItemDetails); //push data into the array
            data.status = 'Approved';
          }
      

    }

    get f() {

        return this.grnGroup.controls;
    
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
            grnStatus: this.f.grnStatus.value,
            supplierAdress:this.f.supplierAdress.value,
            note: this.f.note.value

        }



    }

}
