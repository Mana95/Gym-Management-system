export class diet{
    _id:string;
    membershipId:string;
    intervalName:string;
    dietPlanId:string;
    ScheduleId:string;
    dietPlanName:string;
    dietPlanNote:string;
    intervalNames: intervalArray[];
   
}

export class intervalArray{
    intervalName:string;
    intervalItemArray: IntervalArrayData[];
}


export class IntervalArrayData{
    foodItemName:string;
    quantity:number;
    mearurmentUnit:number;
}