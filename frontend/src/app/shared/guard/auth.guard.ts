import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
        ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log('AUTH')
        console.log(currentUser);
        if(currentUser) {
            // console.log('IF')
            // console.log(route.data.roles)
            //console.log(route.data.roles.indexOf(currentUser.role));
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
        
                return false; 
        }

        return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;



        // if (localStorage.getItem('isLoggedin')) {
        //     return true;
        // }

        // this.router.navigate(['/login']);
        // return false;
    }
}
