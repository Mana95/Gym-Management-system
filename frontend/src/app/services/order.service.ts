import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config.js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  saveCartData(cartData ,invoiceData) {
    return this.http.post(config.PAPYRUS + `/order/saveCartData`, { cartData,invoiceData});
  }

  insertItemCart(data) {
   // console.log(data);

    // localStorage.setItem('cartObject', JSON.stringify(data));
    let cart =  JSON.parse(localStorage.getItem('cartObject'));
    let isInCart = false;
    if (cart) {
      console.log('Cart');
      console.log(cart);
      isInCart = cart.some(item => item.id === data.id);
    } else {
      cart = [];
    }
    if (isInCart) {
      console.log(isInCart);
      cart.map(item => {
        if (item.id === data.id) {
          console.log('item.id');
          console.log(item.id);
          item.qty += data.qty;
        }
        return item;
      });
    } else {
      cart.push(data);
    }
    localStorage.setItem('cartObject', JSON.stringify(cart));





  }
  loadAllinvoiceData() {
    return this.http.get(config.PAPYRUS + `/order/loadAllinvoiceData`);
  }

  loadNavigateItemDetials(id) {
    // console.log(id);
    return this.http.get(config.PAPYRUS + `/order/routeIdData/${id}`);
  }
  loadCardItems() {
    return this.http.get(config.PAPYRUS + `/order/getAllCartItems`);
  }




  getAllSo() {
    return this.http.get(config.PAPYRUS + `/order/getAllSo`);
  }
  savePurchaseOrderData(purchaseOrderData) {
    return this.http.post<any>(config.PAPYRUS + `/order/savePurchaseOrderData`, purchaseOrderData);
  }

  updatequantity(val) {
    console.log(val);
    return this.http.post(config.PAPYRUS + `/order/updateByQuantity`, val);
  }


  insertSalesOrder(data) {
    return this.http.post(config.PAPYRUS + `/order/insertSalesOrder`, data);
  }

  updaterowDataquantity(dataVal) {
    // alert("DATAVAL")
    console.log('DATAVAL');
    console.log(dataVal);
    return this.http.post(config.PAPYRUS + `/order/updateBydeleteQuantity`, dataVal);
  }


  getPendingPo() {
    return this.http.get(config.PAPYRUS + `/order/getPendingPo`);
  }

  updateStatus(val) {
    console.log(val);
    return this.http.post(config.PAPYRUS + `/order/updateStatus`, val);
  }

  getProgressPo() {
    return this.http.get(config.PAPYRUS + `/order/getProgressPo`);
  }
  getByIdPo(poId) {
    return this.http.get(config.PAPYRUS + `/order/getByIdPo/${poId}`);
  }
  getSupplieraddress(sid) {
    return this.http.get(config.PAPYRUS + `/order/getsId/${sid}`);
  }

  saveGrnValues(grnData , updateStatus , ItemData) {

    return this.http.post(config.PAPYRUS + `/order/saveGRN/`, {grnData , updateStatus , ItemData});

  }

  updatepoStatus(poid) {
    const updateVal = {
      id: poid
    };
    console.log('SERVICE');
    return this.http.post(config.PAPYRUS + `/order/updateStatusOfPO/`, updateVal);
  }



}
