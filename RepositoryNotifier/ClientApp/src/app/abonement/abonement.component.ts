import { Component, OnInit, Inject } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { DOCUMENT } from "@angular/common";
import { AlertifyService } from '../service/alertify/alertify.service';
import { PaymentService } from '../service/payment/payment.service';

@Component({
  selector: 'app-abonement',
  templateUrl: './abonement.component.html',
  styleUrls: ['./abonement.component.css']
})
export class AbonementComponent implements OnInit {

  private proSubscriptionPrice: number = 1;
  private businessSubscriptionPrice: number = 2;

  constructor(private githubAuthService: GithubauthService,
    @Inject(DOCUMENT) private document: any,
    private alertifyService: AlertifyService,
    private paymentService: PaymentService,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }

  login() {
    this.document.location.href = this.baseUrl + "api/auth/login";  
  }




  createProSubscription(){
    this.createSubscription(this.proSubscriptionPrice);

  }

  createBusinessSubscription(){
    this.createSubscription(this.businessSubscriptionPrice);
  }

  createSubscription(amount: number){
    // this.paymentService.createSubscription(amount).subscribe(redirectUrl => {
    //   this.document.location.href = redirectUrl;
    // })
  }
}
