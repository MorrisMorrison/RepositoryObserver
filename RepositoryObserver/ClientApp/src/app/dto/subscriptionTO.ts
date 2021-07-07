import { BillingAddressModel } from "../model/billingaddress-model";

export class Subscription{
    username:string;
    premiumPlan:PremiumPlan;
    active:boolean;
    billingAddress: BillingAddressModel;
}

export class CreateSusbcriptionTO{
    amount:number;
    billingAddress: BillingAddressModel;
}

export class PremiumPlan{
    name:string;
    price:number;
    buyingDate:Date;
    payments:Payment[];
}

export class Payment{
    amount:number;
    paymentDate:Date;
    paymentType:string;
    billingAddress: BillingAddressModel;
}

export class BillingAddressTO{
    firstName: string;
    lastName: string;
    eMail: string;
    address:string;
    addressAddition:string;
    country:string;
    city:string;
    postalCode:number;
}