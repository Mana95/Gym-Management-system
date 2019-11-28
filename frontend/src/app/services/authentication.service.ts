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
  public currentUser: Observable<User>;

  constructor(

    private http: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getGroupName() {
    
    return this.http.get(config.PAPYRUS+`/users/groupNames`);

  }
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
  getRoleUser(roleData) {
    console.log(roleData);
    return this.http.get(config.PAPYRUS+`/users/userRoles/${roleData}`);
  }

  deleteRecord(idData){
    let userRecord = idData.id
              alert(userRecord)
      return this.http.delete<any>(config.PAPYRUS +`/users/d/${userRecord}`)
 

  }


  login(firstName: string, password: string): Observable<any> {
    console.log('Authentication' + firstName + password);
   return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { firstName, password })
     .pipe(map(user => {
       // login successfull if there is a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
         console.log('LOGIN')
         console.log(user);
         console.log(this.currentUser)
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

      //user get by Id
      getById(id: any): Observable<User> {

        console.log("This is the job service" +  id);
       
          return this.http.get<any>(config.PAPYRUS+`/users/userById/${id}`);
        }

        //Update user
        updateUser(UserParamUpdate): Observable<any> {
          console.log("New Data" + UserParamUpdate);
          return this.http.post<User>(config.PAPYRUS+`/users/userUpdate`, UserParamUpdate)
        }

        //Get Group data by id 

        LoadGroupData(groupid): Observable<any> {
          console.log("service :" + groupid);
          return this.http.get<any>(config.PAPYRUS+`/users/getId/${groupid}`);

        }

        logout(): void {
          // remove user from local storage to log user out
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
      

}





