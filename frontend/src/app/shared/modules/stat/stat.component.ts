import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() typeOfCard : string;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    routePage(){
            if(this.typeOfCard && this.typeOfCard == 'schedule'){
                window.open("http://localhost:4200/viewSchedule");
            }else if(this.typeOfCard && this.typeOfCard ==  'approved'){
                window.open("http://localhost:4200/requestSchedule");
            }
    }
}
