import { CatagoryService } from 'src/app/services/catagory.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-bs-element',
    templateUrl: './bs-element.component.html',
    styleUrls: ['./bs-element.component.scss'],
    animations: [routerTransition()]
})
export class BsElementComponent implements OnInit {

  purchaseOrderGroup:FormGroup

    closeResult: string;
    poId:any;
    
    currentDate :any;
    currentTime:any;
    supplierName:any;
    supllierId:any
    supData:any;
    active = false;
    firstName:any;
    lastName:any;
    dataId:any;
    catName:any;
    subcat:any;
    ItemName:any;
    itemId:any;
    activecat= false;
    qty:Number;

    constructor(
        private authenticationService:AuthenticationService,
        private catagoryService:CatagoryService,
        private modalService: NgbModal,
        private formBuilder:FormBuilder

    ) {}

    ngOnInit() {
      this.purchaseOrderGroup = this.formBuilder.group({
        
      })
    

        //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var string_length = 8;
    var id = 'PO_' + '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.poId = id;

      this.currentTime = moment().format('LT');
      this.currentDate = moment().subtract(10, 'days').calendar();
        
        this.authenticationService.getAllSuppliers()
        .subscribe(
            data=> {
                console.log(data);
               this.supllierId=data; 

            }
        )

    }
     this.catagoryService.getCatNames()
     .subscribe(
         response=>{
             console.log(response);
             this.catName = response;
         }
     )
    }
    display(data) {
      console.log(data.value);

      this.catagoryService.getItemsDetails(data.value)
          .subscribe(
            data => {
              console.log(data);
                this.ItemName= data[0].item_name;
                this.itemId = data[0].id;
                this.qty = data[0].quantity;
                console.log( this.itemId);
             
    
            },
            error => {
              console.log(error);
            });

     

    }

    getCatValue(data) {
        console.log('TS')
        let catName = data.value;
        console.log(catName)
        this.catagoryService.getchoosenItems(catName)
          .subscribe(
            data => {
                console.log(data);
              this.subcat = data;
              this.activecat = true;
              console.log(data);
    
            },
            error => {
              console.log(error);
            });
    
        this.active = true
      }

    open(content ,supplierName) {
        console.log(supplierName.value);
        let data = supplierName.value

        this.authenticationService.getReleventSuppliers(data)
        .subscribe(
            response=>{
            if(response) {
                    console.log(response);
                    this.supData = response;
                    this.active = true;
                    if(response==''){
                        alert('Empty')
                    }
                    }
            },
            error=>{
                console.log(error); 
            }

        )
        
        this.modalService.open(content, {size: 'lg'})
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

    onClickMe(data ,content) {
       // alert(data.id);
        this.firstName = data.sup_firstName;
        this.lastName=data.sup_lastName;
        this.dataId = data.sup_id;
        //Closed the model
        this.modalService.dismissAll()
    }

    onSubmit() {

    }

    



}
