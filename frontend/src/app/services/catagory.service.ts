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

   getCatNames() {

    return this.http.get<any>(config.PAPYRUS+`/catagory/getCatName`)

   }
   insertSubCat(data) {
    return this.http.post<any>(config.PAPYRUS+`/catagory/insertSubCat`, data)
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
