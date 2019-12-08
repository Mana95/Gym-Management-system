import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config.js';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(
    private http: HttpClient
   ) { }

   getSubCatNames(catName) {
     console.log('CATAGORY')
     console.log(catName)
     return this.http.get<any>(config.PAPYRUS +`/catagory/getNames/${catName}`)
   }
   getItemsDetails(item) {
    return this.http.get<any>(config.PAPYRUS +`/catagory/getByItemName/${item}`)
   }
   getchoosenItems(catagory) {
    return this.http.get<any>(config.PAPYRUS +`/catagory/getitemsNames/${catagory}`)
   }

   insertItemData(data) {
     console.log('SERVICE'+ data)
    return this.http.post<any>(config.PAPYRUS+`/catagory/insertItemData`, data)
   }

   getCatNames() {

    return this.http.get<any>(config.PAPYRUS+`/catagory/getCatName`)

   }
   insertSubCat(data) {
    return this.http.post<any>(config.PAPYRUS+`/catagory/insertSubCat`, data)
   }

   getItemDetials(){
    return this.http.get<any>(config.PAPYRUS+`/catagory/getItemDetails`)
   }


   deleteRecord(idData) {

    let recordId = idData.id
              alert(recordId)
      return this.http.delete<any>(config.PAPYRUS +`/catagory/deleteRec/${recordId}`)
   }
   getAll() {

    return this.http.get<any>(config.PAPYRUS+`/catagory/getAll`)

   }

   getSubCat() {
    return this.http.get<any>(config.PAPYRUS+`/catagory/getAllSub`)
   }

  insertMainCat(catData) {
console.log(catData)

return this.http.post<any>(config.PAPYRUS+`/catagory/insertCat`, catData)

  }

}
