import { Injectable } from '@angular/core';
import { config } from '../config/config.js';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(

    private http: HttpClient
  ) { }

  GroupCreation(groupParam) {
    alert(JSON.stringify(groupParam));
    return this.http.post<any>(config.PAPYRUS+ `/users/groupCreation`, groupParam);

  }
  getAllGroup() {
    return this.http.get(config.PAPYRUS+`/users/groups`);
  }

  getAllUsers() {
  
    return this.http.get(config.PAPYRUS+`/users/u`);
  
  }
  getAllRole() {
    return this.http.get(config.PAPYRUS+`/users/roles`);
  
  }

  deleteRecord(idData){
    let userRecord = idData.id
              alert(userRecord)
      return this.http.delete<any>(config.PAPYRUS +`/users/d/${userRecord}`)
 

  }


  login(username: string, password: string): Observable<any> {
    console.log(username + password);
   return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { username, password })
     .pipe(map(user => {
       // login successfull if there is a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
       }

       return user;
     }));
  }

  register(userParam): Observable<any> {
    //methin thamai call karala thiyenne back end ekata 
    alert(userParam.username);
          console.log (userParam );
          return this.http.post<any>(config.PAPYRUS+`/users/register`, userParam)
          .pipe(map(user => {
            // register successfull if there is a jwt token in the response
            return user;
          }));
       }

       userCreation(UserCreationParam): Observable<any> {
        // alert("here is the service");
        return this.http.post<any>(config.PAPYRUS+ `/users/userCreation`, UserCreationParam)

      }

      roleCreation(UserRole): Observable<any> {
        
        return this.http.post<any>(config.PAPYRUS+ `/roles/roleCreation`, UserRole);

      }

      getById(id: any): Observable<User> {

        console.log("This is the job service" +  id);
       
          return this.http.get<any>(config.PAPYRUS+`/users/userById/${id}`);
        }
      

}





