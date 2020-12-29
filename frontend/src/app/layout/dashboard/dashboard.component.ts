import { AuthenticationService } from 'src/app/services/authentication.service';
import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GlobalService } from 'src/app/shared/global/global.service';
import { Role } from 'src/app/_models/role';
import * as moment from "moment";
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    SchedulePending:number = 0;
    SchedulePendingApprived:number = 0;
    membershiptType:string;
    currentUser: any;
    membershipType:string;
    membershipObject : any;
    membershipExpireDate : string;



    private displayStatusSubject: BehaviorSubject<any>;
    public displayStatus: Observable<any>;
  

    constructor(
        private globalService :GlobalService,
        private scheduleService:ScheduleService,
        private authenticationService:AuthenticationService,

    ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
        this.currentUser = this.authenticationService.currentUserValue;

        if(this.currentUser.role == 'Membership'){
            this.authenticationService.getMembershipById(this.currentUser.user_id)
            .subscribe(response=>{
                this.membershipObject = response
                this.membershipType =  this.membershipObject.typeName;
              this.membershipExpireDate = moment(this.membershipObject.endDate).format('MMM Do YYYY')


            })
        }
        
    }

    ngOnInit() {
     //   localStorage.setItem('dashboadStatus', 'false');
        this.loadActivityData();

        this.displayStatusSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('dashboadStatus')));
        this.displayStatus = this.displayStatusSubject.asObservable();
       
    }

    public get checkDisplayStatus() {
  
        return this.displayStatusSubject.value;
      }


    loadActivityData() {
        this.scheduleService.loadPending()
        .subscribe(
            res=>{
                var resArray = res;
            let _findPening = resArray.filter(s=>s.status == 4);
            let _findApproved = resArray.filter(s=>s.status == 1);
                if(_findPening)
                this.SchedulePending = _findPening.length;
               if(_findApproved)
               this.SchedulePendingApprived = _findApproved.length;
            }
        )


             

    }
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    get typeOfCard() {
        return 'schedule'
    }


    get isMembership() {

        return this.currentUser && this.currentUser.role === Role.Membership;

        // for(var i =0 ; this.role_name_array.length; i++ ){
        //     return this.currentUser && this.currentUser.role === this.role_name_array[i];
        // }
       
    }
    get isMembers() {
        return this.currentUser && this.currentUser.role === Role.Member;
    }
    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }



    get getDisplayMessage() {
        var _displayStatus = this.checkDisplayStatus;
      
        if(_displayStatus == true){
            return 'Now your membership request is on processing'
        }
     
        return   ' Request a membership package by clicking the "Request membership"';
    }
}
