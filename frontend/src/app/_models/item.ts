export class item {
    id: string;
    cat_name:string;
    Importered_Country:string;
    itemType:string;
    itemCreatedName:string;
    item_name:string;
    description:string;
    sub_cat:string;
    image:string;
    createdDate:Date;
    quantity:number;
    unitPrice:number;
    stockAvlStatus:boolean;

}

export class purchaserOrderList {
    
    _id :string;
    purchaseOrderId : string;
    supplierId : string;
    supllierFirstName :string;
    supplierLastName : string;
    time : string;
    categoryName : string;
    status : string;
    currentUser :string;
    ItemDataValues : ItemDataValues[];   
    createdDate : Date;
    totalAmount : number;
    
}

export class ItemDataValues   {
    _id :string;
    itemId : string;
    itemName :string;
    qty : number;
    status :string;
}