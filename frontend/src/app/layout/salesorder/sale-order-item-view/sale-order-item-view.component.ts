import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from 'src/app/services/catagory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  }

  //Load the relevent Item data
  loadItemDetails(){

    this.viewCartForm = this.formBuilder.group({
       id: [''],
       itemName:[''],
       qty:[''],
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
        console.log('data')
        console.log(data);
        this.itemCartData = data;
        this.viewCartForm.controls['id'].setValue(id);
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
console.log(this.itemCart.image.value);

    this.submitted = true;
      let itemCartData = {
        id: this.itemCart.id.value,
        itemName:this.itemCart.itemName.value,
        qty:this.itemCart.qty.value,
        image:this.itemCart.image.value,
        sellingPrice:this.itemCart.sellingPrice.value,
        mainCategory:this.itemCart.mainCategory.value,
        totalPrice:this.itemCart.totalPrice.value,
        avlableQty:this.itemCart.avlableQty.value,
      }

      this.orderService.insertItemCart(itemCartData)
      //console.log(itemCartData);
  }
}
