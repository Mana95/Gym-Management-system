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
    showMenuCat: string;
    pushRightClass: string;
    currentUser: User;
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
        this.showMenu = '';
        this.showMenuCat = '';
        this.pushRightClass = 'push-right';
        console.log(Role);
        this.authenticationService.getAllRole()
        .subscribe(
            response=>{
                console.log('RESPONSE ABOUT ROLES');
                // console.log(response[0]);
                // console.log(response[0].roleName)
                let i=0;
                while(this.currentUser.role ==response[i].roleName ){
                   
                    console.log('CURRUNT ROLENAME')
                    console.log(response[i].roleName)
                    if(this.currentUser.role ==response[i].roleName ){
                        console.log('While Loop')
                        this.role_name_array.push(response[i].roleName );
                        console.log(this.role_name_array);
                    }
                    i++;
                }
               
               
            },
            error=> {
                console.log(error);
            }
          
        )
    }

    get isAdmin() {
        for(var i =0 ; this.role_name_array.length; i++ ){
            return this.currentUser && this.currentUser.role === this.role_name_array[i];
        }
       
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandCatClass (element:any) {
        if (element === this.showMenuCat) {
            this.showMenuCat = '0';
        } else {
            this.showMenuCat = element;
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
}
