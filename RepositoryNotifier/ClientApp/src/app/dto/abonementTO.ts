import { BillingAddressModel } from "../model/billingaddress-model";

export class Abonement{
    username:string;
    premiumPlan:PremiumPlan;
    active:boolean;
}

export class CreateAbonementTO{
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
}