import { CatagoryService } from './../../services/catagory.service';
import { AuthenticationService } from './../../services/authentication.service';
import { OrderService } from './../../services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.scss']
})
export class SalesorderComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  salesOrderGroup:FormGroup;
  closeResult: string;

  submitted = false;
  loading = false;
  error = '';

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
      salesOrderId:[''],
      date:[''],
      customerId:['',Validators.required],
      customerFirstName:[''],
      customerLastName:[''],
      purchaseOrderDate:[''],
      categoryName:[''],
      grnStatus:[''],
      supplierAdress:[''],
      note:['',Validators.required],
      buyingPrice:['', Validators.required],
  
  
  
  }) 
  }

  get f() {

    return this.salesOrderGroup.controls;

  }

  open(content, supplierName) {
    //alert(content.value);
    console.log(supplierName.value);
    let data = supplierName.value

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
