import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private authenticationService : AuthenticationService
    ) {
    }

    ngOnInit() {
        this.authenticationService.autoUpdateStatus()
        .subscribe(
            response=>{
                console.log(response);
            },
            error=>console.log(error)
        );


    }
}
