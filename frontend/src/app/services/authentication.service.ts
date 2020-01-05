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

  // loadSchedule() {
  //   return this.http.get(config.PAPYRUS+`/users/loadSchedule`)
  // }
  updateRole(data) {
    return this.http.post(config.PAPYRUS+`/users/updateRole`,data)
  }
  getReleventRoledata(data){
    return this.http.get(config.PAPYRUS+`/users/getreleventRoleData/${data}`)
  }
  getRelventCustomer(data){
    return this.http.get(config.PAPYRUS+`/users/getreleventCustomerData/${data}`)
  }

  getAllSchedule() {
    return this.http.get(config.PAPYRUS+`/users/getAllSchedule`)
  }


  saveScheduleType(body){
    return this.http.post(config.PAPYRUS+`/users/saveScheduleType`,body)
  }


  updateStatus(body) {
    return this.http.post(config.PAPYRUS+`/users/updateStatus`,body)
  } 

  getByPendingMembership() {
    return this.http.get(config.PAPYRUS+`/users/pendingMembership`)
  }


  
  insertMembershipToUser(body):Observable<any> {
    return this.http.post(config.PAPYRUS+`/users/insertMembershipUser`,body)
  }

  saveInsertMembershipDetails(membershipbody ,UserDatabody):Observable<any> {
    return this.http.post(config.PAPYRUS+`/users/insertMembership`,{membershipbody ,UserDatabody})
  }


  getAllMembershipType() {
    return this.http.get(config.PAPYRUS+`/users/getAllMembershipType`)
  }

  insertMembershipTypeData(body) {
    return this.http.post(config.PAPYRUS +`/users/saveMembershiptypeData`, body);
  }
  
  ValidPasswordToken(body): Observable<any> {
    return this.http.post(config.PAPYRUS +`/users/valid-password-token`, body);
  }
  newPassword(body): Observable<any> {
    return this.http.post(config.PAPYRUS +`/users/new-password`, body);
  }

 requestReset(body): Observable<any> {
    return this.http.post(config.PAPYRUS +`/users/req-reset-password`, body);
  }
  getReleventSuppliers(data) {
    return this.http.get(config.PAPYRUS+`/users/getreleventData/${data}`)
  }


  getSubCatNames(data) {
    return this.http.get(config.PAPYRUS+`/users/subCatGetting/${data}`)
  }

  getAllSuppliers() {
    return this.http.get(config.PAPYRUS+`/users/allSuppliers`)
  }

  getAllCustomer() {
    return this.http.get(config.PAPYRUS+`/users/allCustomers`)
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
    // let userRecord = idData.id
    //           alert(userRecord)
      return this.http.post<any>(config.PAPYRUS +`/users/d/` ,idData)
 

  }

  registerCustomer(data) :Observable<any>{
    console.log(data)
    return this.http.post<any>(config.PAPYRUS+ `/users/cusCreation`, data)
    
  }
  registerSupplier (data):Observable<any> {
    return this.http.post<any>(config.PAPYRUS+ `/users/supCreation`, data)
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
          return this.http.post<any>(config.PAPYRUS+`/users/signUp`, userParam)
          .pipe(map(user => {
            // register successfull if there is a jwt token in the response
            return user;
          }));
       }
       userCreationPub(data): Observable<any> {
        return this.http.post<any>(config.PAPYRUS+ `/users/userCreationPub`, data)
       }
       userCreation(UserCreationParam): Observable<any> {
        // alert("here is the service");
        return this.http.post<any>(config.PAPYRUS+ `/users/UserCreation`, UserCreationParam)

      }
      EmployeeCreate(UserCreationParam): Observable<any> {
       let objectData = JSON.stringify(UserCreationParam);
       console.log(objectData);
   
         return this.http.post<any>(config.PAPYRUS+ `/users/EmployeeCreation`, UserCreationParam)

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





