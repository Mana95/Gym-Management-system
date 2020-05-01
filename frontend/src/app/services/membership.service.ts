import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }



  getMembershipttypeData(data:any) {
    return this.http.get(config.PAPYRUS+`/shedule/getmembershipDetais/${data}`)
  }


  //check email
  checkEmailAvailable(data:any){

    return this.http.get(config.PAPYRUS+`/shedule/getmembershipcheckEmailAvailable/${data}`);
    // .pipe(map(email => {
    //       console.log(email);
    // }))
  }

  checkUsernameAvailable(data:any){
    return this.http.get(config.PAPYRUS+`/shedule/getmembershipcheckUsernameAvailable/${data}`);
  }





}
