
import { AbstractControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from 'src/app/services/catagory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-sale-order-item-view',
  templateUrl: './sale-order-item-view.component.html',
  styleUrls: ['./sale-order-item-view.component.scss']
})
export class SaleOrderItemViewComponent implements OnInit {
  itemCartData:any;
  viewCartForm : FormGroup
  submitted = false;
  displayTotal ='0.00';
  displayAlert = false;
  maxNumber :any;
  viewCartEnalability = false;
  cartData:any;
  comments: string;
  count: number;
  itemId:any;

  constructor(
    private orderService: OrderService, 
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private catagoryService: CatagoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
   
  ) { }

  ngOnInit() {
    this.loadItemDetails()
    this.cartData= this.authenticationService.cartDataValue;
    console.log('dsadsadsadas');
    console.log(this.cartData)
    if(this.cartData != undefined){
    if(this.cartData.length>0){
      this.viewCartEnalability = true;
    }
  }
    
  }
  receiveComment($event) {
    //alert("here is")
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }
  //Load the relevent Item data
  loadItemDetails(){

    this.viewCartForm = this.formBuilder.group({
       id: [''],
       itemName:[''],
       itemId:[''],
       qty:['' , Validators.required],
       sellingPrice:[''],
       mainCategory:[''],
       totalPrice:[''],
       avlableQty:[''],
       image:['']

    })

    //Did not input "-" Vaues
    this.myInput.valueChanges 
    .subscribe(() => {
        this.myInput.setValue(Math.abs(this.myInput.value), {emitEvent: false});
    });

    let id =  (this.route.snapshot.paramMap.get('id'))
    this.orderService.loadNavigateItemDetials(id)
    .subscribe(
      data=>{
     //   console.log('HIIIIIIIIIIIIIIIIIIIIIIIi')
        console.log(data[0].id);
       this.itemId = data[0].id;
        this.itemCartData = data;
        this.viewCartForm.controls['id'].setValue(id);
        this.viewCartForm.controls['itemId'].setValue(data[0].id);
        this.viewCartForm.controls['itemName'].setValue(data[0].item_name);
        this.viewCartForm.controls['sellingPrice'].setValue(data[0].selling_price);
        this.viewCartForm.controls['avlableQty'].setValue(data[0].quantity);
        this.viewCartForm.controls['mainCategory'].setValue(data[0].cat_name);
        this.viewCartForm.controls['image'].setValue(data[0].image);
      }
    )
  }


  //did not input minze Value
  get myInput(): AbstractControl {
    return this.viewCartForm.controls['qty'];
}

  get itemCart() {

    return this.viewCartForm.controls;

  }
//Calculate the 
  calculateTotal(event){
   let inputNumber = this.itemCart.qty.value;
   let price = this.itemCart.sellingPrice.value;
   this.maxNumber = this.itemCart.avlableQty.value
    if(inputNumber >= this.itemCart.avlableQty.value){
      this.displayAlert = true;
      this.viewCartForm.controls['qty'].setValue(0);
      
      this.displayTotal =price.toFixed(2); 
      setTimeout(()=>{ 
        this.displayAlert = false; }, 2000);
        return;
    }else{
   let total = inputNumber * price;
   this.displayTotal = total.toFixed(2);
   this.viewCartForm.controls['totalPrice'].setValue(total);
  }
  // console.log(inputNumber);

  }

  public closeAlert(alert: any) {
    this.displayAlert = false;
}

routePage() {

  this.router.navigate(['/addToCart']);
 
}

  onSubmit() {
//console.log(this.itemCart.image.value);

console.log(typeof this.itemCart.qty.value)


if(this.viewCartForm.valid && this.itemCart.qty.value>0){
  this.viewCartEnalability = true;
  this.viewCartEnalability =true;
  this.submitted = true;
  let itemCartData = {
    id: this.itemCart.id.value,
    itemId:this.itemCart.itemId.value,
    itemName:this.itemCart.itemName.value,
    qty:this.itemCart.qty.value,
    image:this.itemCart.image.value,
    sellingPrice:this.itemCart.sellingPrice.value,
    mainCategory:this.itemCart.mainCategory.value,
    totalPrice:this.itemCart.totalPrice.value,
    avlableQty:this.itemCart.avlableQty.value,
  }

  this.orderService.insertItemCart(itemCartData);
  Swal.fire({
    text: `${itemCartData.itemName} Added to Paying table`,
    icon: 'success'
  });
}else{
  Swal.fire('Oops...', `Please insert Quantity value for ${this.itemCart.itemName.value}`, 'error')
}
   
      //console.log(itemCartData);
  }
}
