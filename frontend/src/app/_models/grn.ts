export class GoodReaciveNote {
    GrnId:string;
    purchaseOrderId: string;
    supplier:string;
    dateOfTheGrn:Date;
    supplierAddress:string;
    purchaseOrderDate:Date;
    note:string;
    Total:number;
    itemTable:Items[];
}
export class Items{
    itemId:string;
    itemName:string;
    quantity:number;
    buyingPrice:number;
    amountPerItem:number;
}