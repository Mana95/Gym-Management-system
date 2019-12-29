import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { config } from '../config/config.js';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }


   getMySchedule(userId) {
    return this.http.get(config.PAPYRUS+`/shedule/getMySchedule/${userId}`)
   }
  getscedultType() {
    return this.http.get<any>(config.PAPYRUS+`/shedule/getAllSchedule`)
  }

  insertScheduleData(data){
    return this.http.post(config.PAPYRUS+`/shedule/insertData` , data);
  
  }
}
