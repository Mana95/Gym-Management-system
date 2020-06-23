import { Role } from './../../../_models/role';
import { User } from './../../../_models/user';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    showSchdulerMenu:string;
    showMenuCat: string;
    showMenuRequest: string;
    addMembership:string;
    pushRightClass: string;
    showMenuSch:string;
    currentUser: User;
    exercise:string;
    showReportMenu:string;
    
    public role_name_array = [];
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService,
         public router: Router, 
         private authenticationService: AuthenticationService) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenuRequest='';
        this.showMenu = '';
        this.showMenuCat = '';
        this.pushRightClass = 'push-right';
     //   console.log('ROLE')
      //  console.log(Role);
        this.authenticationService.getAllRole()
        .subscribe(
            response=>{
              //  console.log('RESPONSE ABOUT ROLES');
                // console.log(response[0]);
                // console.log(response[0].roleName)
                let i=0;
                while(this.currentUser.role ==response[i].roleName ){
                   
                //    console.log('CURRUNT ROLENAME')
                //    console.log(response[i].roleName)
                    if(this.currentUser.role ==response[i].roleName ){
                     //   console.log('While Loop')
                        this.role_name_array.push(response[i].roleName );
                     //   console.log(this.role_name_array);
                    }
                    i++;
                }
               
               
            },
            error=> {
                console.log(error);
            }
          
        )
    }

    get onlyForMember(){
        if(this.currentUser.role == Role.Membership){
            return this.currentUser && this.currentUser.role === Role.Membership;
    }
}
    
    get customer() {
        if(this.currentUser.role == Role.Admin){
            
            return this.currentUser && this.currentUser.role === Role.Admin;
        } else if(this.currentUser.role == Role.Customer) {
            return this.currentUser && this.currentUser.role === Role.Customer;
        }   
    }
    get Instructor() {
         if(this.currentUser.role === Role.Instructor){

            return this.currentUser && this.currentUser.role === Role.Instructor;
        }
       
    }
    get OnlyMembership() {
        if(this.currentUser.role === Role.Membership){
            return this.currentUser && this.currentUser.role === Role.Membership 
        }
    }
    

    get Membership () {
        if(this.currentUser.role === Role.Customer){
            return this.currentUser && this.currentUser.role === Role.Customer;
        }
      
    }

    get MembershipRequest() {
        if(this.currentUser.role === Role.Customer){
            return this.currentUser && this.currentUser.role === Role.Customer;
        }else if(this.currentUser.role === Role.Member){
            return this.currentUser && this.currentUser.role === Role.Member;
        }
    }

    //Membershihp Module
    get onlyAdminEmployee() {
        if(this.currentUser.role === Role.User){
            return this.currentUser && this.currentUser.role === Role.User;
        }else if(this.currentUser.role === Role.Admin){
            return this.currentUser && this.currentUser.role === Role.Admin;
        }


    }

    get onlyMember() {
        return this.currentUser && this.currentUser.role === Role.Member;

    }

    get isAdmin() {

        return this.currentUser && this.currentUser.role === Role.Admin;

        // for(var i =0 ; this.role_name_array.length; i++ ){
        //     return this.currentUser && this.currentUser.role === this.role_name_array[i];
        // }
       
    }

    get onlyMembers(){
        if(this.currentUser.role === Role.Membership){
            return this.currentUser && this.currentUser.role === Role.Membership 
        } 
    }
    get requestSchedule() {
        if(this.currentUser.role === Role.Admin){
            return this.currentUser && this.currentUser.role === Role.Admin 
        }
        else if(this.currentUser.role === Role.User){

            return this.currentUser && this.currentUser.role === Role.User;
        }
        else if(this.currentUser.role === Role.Instructor){

            return this.currentUser && this.currentUser.role === Role.Instructor;
        }
    }

    get category(){
        if(this.currentUser.role === Role.Admin){
            return this.currentUser && this.currentUser.role === Role.Admin 
        }        
    }
get salesOrder () {
    if(this.currentUser.role === Role.Admin){
        return this.currentUser && this.currentUser.role === Role.Admin 
    }
    else if(this.currentUser.role === Role.User){

        return this.currentUser && this.currentUser.role === Role.User;
    }
    else if(this.currentUser.role === Role.Customer){

        return this.currentUser && this.currentUser.role === Role.Customer;
    }
}

get PurchaseOrder(){
    if(this.currentUser.role === Role.Admin){
        return this.currentUser && this.currentUser.role === Role.Admin 
    }
    else if(this.currentUser.role === Role.User){

        return this.currentUser && this.currentUser.role === Role.User;
    }
    else if(this.currentUser.role === Role.Supplier){

        return this.currentUser && this.currentUser.role === Role.Supplier;
    }
}


    get requestModule(){
        if(this.currentUser.role === Role.Admin){
            return this.currentUser && this.currentUser.role === Role.Admin 
        }
        else if(this.currentUser.role === Role.User){

            return this.currentUser && this.currentUser.role === Role.User;
        }
         
            
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandRequestClass (element:any) {
        if (element === this.showMenuRequest) {
            this.showMenuRequest = '0';
        } else {
            this.showMenuRequest = element;
        }
    }

    addExpandCatClass (element:any) {
        if (element === this.showMenuCat) {
            this.showMenuCat = '0';
        } else {
            this.showMenuCat = element;
        }
    }
    addMembershipExpandClass(element:any){
        if (element === this.addMembership) {
            this.addMembership = '0';
        } else {
            this.addMembership = element;
        }
    }

    addExerciseExpandClass(element:any){
        if (element === this.exercise) {
            this.exercise = '0';
        } else {
            this.exercise = element;
        }
    }
    addExpandSchClass(element:any){
        if (element === this.showMenuSch) {
            this.showMenuSch = '0';
        } else {
            this.showMenuSch = element;
        }
    }
    addScheduleExpandClass(element: any){
   

     if (element === this.showSchdulerMenu) {
        this.showSchdulerMenu = '0';
    } else {
        this.showSchdulerMenu = element;
    }
    }

    addReportExpandClass(element:any){
             //  alert(element)
             if (element === this.showReportMenu) {
                this.showReportMenu = '0';
            } else {
                this.showReportMenu = element;
            }
    }
    addExpandClass(element: any) {
      //  alert(element)
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

   get isMembership(){
    if(this.currentUser.role === Role.Membership){
        return this.currentUser && this.currentUser.role === Role.Membership 
    }
    }

    

}
