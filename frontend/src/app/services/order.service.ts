import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config.js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  loadNavigateItemDetials(id){
    //console.log(id);
    return this.http.get(config.PAPYRUS+`/order/routeIdData/${id}`)
  }
  loadCardItems(){
    return this.http.get(config.PAPYRUS+`/order/getAllCartItems`)
  }




  getAllSo() {
    return this.http.get(config.PAPYRUS+`/order/getAllSo`)
  }
  savePurchaseOrderData(purchaseOrderData) {
    return this.http.post<any>(config.PAPYRUS+`/order/savePurchaseOrderData`, purchaseOrderData)
  }

  updatequantity(val) {
    console.log(val)
    // let qty = {
    //   id:val.itemId,
    //   quantity:val.qty
    // }
    //console.log(qty);
    return this.http.post(config.PAPYRUS+`/order/updateByQuantity`, val)
  }


  insertSalesOrder(data) {
    return this.http.post(config.PAPYRUS+`/order/insertSalesOrder`, data)
  }

  updaterowDataquantity(dataVal) {
    //alert("DATAVAL")
    console.log('DATAVAL')
    console.log(dataVal)
    return this.http.post(config.PAPYRUS+`/order/updateBydeleteQuantity`, dataVal)
  }


  getPendingPo() {
    return this.http.get(config.PAPYRUS+`/order/getPendingPo`)
  }

  updateStatus(val) {
    console.log(val);
    return this.http.post(config.PAPYRUS+`/order/updateStatus`,val)
  }

  getProgressPo() {
    return this.http.get(config.PAPYRUS+`/order/getProgressPo`)
  }
  getByIdPo(poId) {
    return this.http.get(config.PAPYRUS+`/order/getByIdPo/${poId}`)
  }
  getSupplieraddress(sid) {
    return this.http.get(config.PAPYRUS+`/order/getsId/${sid}`)
  }

  saveGrnValues(data) {
    console.log('save')
    console.log(data);
    return this.http.post(config.PAPYRUS+`/order/saveGRN/`,data)

  }

  updatepoStatus(poid){
    let updateVal = {
      id:poid
    }
    console.log('SERVICE')
    return this.http.post(config.PAPYRUS+`/order/updateStatusOfPO/`,updateVal)
  }



}
