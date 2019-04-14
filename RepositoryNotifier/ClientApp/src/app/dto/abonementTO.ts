export class Abonement{
    username:string;
    premiumPlan:PremiumPlan;
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
}