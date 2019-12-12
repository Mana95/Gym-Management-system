import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config.js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  savePurchaseOrderData(purchaseOrderData) {
    return this.http.post<any>(config.PAPYRUS+`/order/savePurchaseOrderData`, purchaseOrderData)
  }

  updatequantity(val , itemId) {
    console.log(val)
    let qty = {
      id:itemId,
      quantity:val
    }
    console.log(qty);
    return this.http.post(config.PAPYRUS+`/order/updateByQuantity`, qty)
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
}
