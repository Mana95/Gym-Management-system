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
  updateSupplier(updateSupplier , userData){
    return this.http.patch(config.PAPYRUS+`/users/updateSupplierData`, {updateSupplier , userData})

  }


  getReleventUserData(id){
      return this.http.get(config.PAPYRUS+`/users/getReleventUserData/${id}`)
  }
  updateIstructor(data ,UserData):Observable<any>{
    return this.http.patch(config.PAPYRUS+`/users/updateinstructor`,{data ,UserData})
  }


  getInstructorById(id) {
    return this.http.get(config.PAPYRUS+`/users/getByIdInstructor/${id}`)
  }
  getAllMembership(){
    return this.http.get(config.PAPYRUS+`/users/getAllMembership`)
  }


  responseAllInstructorData() {
    return this.http.get(config.PAPYRUS+`/users/responseAllInstructorData`)
  }



  autoUpdateStatus() {
    return this.http.get(config.PAPYRUS+`/users/autoUpdate`)
  }

  saveMembership(data){
    console.log(data);
    return this.http.post(config.PAPYRUS+`/users/savemember`,data)
  }



  findCustomer(data){
    return this.http.get(config.PAPYRUS+`/users/findCustomer/${data}`)
  }
  saveInstrutor(data ,UserData):Observable<any>{
    return this.http.post(config.PAPYRUS+`/users/instructor`,{data ,UserData})
  }
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

  registerCustomer(data ,userParam) :Observable<any>{
    
    return this.http.post<any>(config.PAPYRUS+ `/users/cusCreation`, {data ,userParam})
    
  }
  registerSupplier (sup_data ,UserData ,mailData ):Observable<any> {
    return this.http.post<any>(config.PAPYRUS+ `/users/supCreation`,{sup_data ,UserData ,mailData})
  }

  checkNICNumber(nicNo: string): Observable<any>{
    return this.http.post<any>(config.PAPYRUS+`/users/checkNIC`,{nicNo})
 }


  login(email: string, password: string): Observable<any> {
   // console.log('Authentication' + firstName + password);
   return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { email, password })
     .pipe(map(user => {
       // login successfull if there is a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
        // console.log('LOGIN')
        // console.log(user);
         //console.log(this.currentUser)
         this.currentUserSubject.next(user);
       }

       return user;
     }));
  }

  register(userParam): Observable<any> {
    //methin thamai call karala thiyenne back end ekata 
   // alert(userParam.username);
        //  console.log (userParam );
          return this.http.post<any>(config.PAPYRUS+`/users/signUp`, userParam)
          .pipe(map(user => {
            // register successfull if there is a jwt token in the response
            return user;
          }));
       }
       userCreationPub(data): Observable<any> {
        return this.http.post<any>(config.PAPYRUS+ `/users/userCreationPub`, data)
       }
       SendSupplierMail(mailData): Observable<any>{
        return this.http.post<any>(config.PAPYRUS+ `/users/supplierMail`, mailData)
       }



       userCreation(UserCreationParam): Observable<any> {
        // alert("here is the service");
        return this.http.post<any>(config.PAPYRUS+ `/users/UserCreation`, UserCreationParam)

      }
      EmployeeCreate(UserCreationParam ,UserData): Observable<any> {
       let objectData = JSON.stringify(UserCreationParam);
      // console.log(objectData);
         return this.http.post<any>(config.PAPYRUS+ `/users/EmployeeCreation`, {UserCreationParam ,UserData})

      }


      roleCreation(UserRole): Observable<any> {
        
        return this.http.post<any>(config.PAPYRUS+ `/roles/roleCreation`, UserRole);

      }

      //user get by Id
      getById(id: any): Observable<User> {
          return this.http.get<any>(config.PAPYRUS+`/users/userById/${id}`);
        }

        //Update user
        updateUser(UserParamUpdate , userData): Observable<any> {
        
          return this.http.put<User>(config.PAPYRUS+`/users/userUpdate`, {UserParamUpdate , userData})
        }

        //Get Group data by id 

        LoadGroupData(groupid): Observable<any> {
          console.log("service :" + groupid);
          return this.http.get<any>(config.PAPYRUS+`/users/getId/${groupid}`);

        }

        logout(): void {
          // remove user from local storage to log user out
          localStorage.removeItem('currentUser');
          localStorage.removeItem('cartObject');
          this.currentUserSubject.next(null);
        }

        loadProfileData(id) {
      
          return this.http.get<any>(config.PAPYRUS+`/users/loadProfileData/${id}`);
        }
      
        getReleventType(event){
          return this.http.get<any>(config.PAPYRUS+`/users/getReleventType/${event}`);
        }

        inActiveMembership(memberhipData) {
          return this.http.patch(config.PAPYRUS+`/users/membershipInactive/` ,memberhipData);  
        }

        deleteInstructorData(data){
          return this.http.patch(config.PAPYRUS+`/users/instrucotrInactive/` ,data);  
        }


        getReleventActivationOfEmployee(status){
          return this.http.get(config.PAPYRUS+`/users/getReleventActivationOfEmployee/${status}`);  
        
        }
}





