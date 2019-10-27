import { Component, OnInit, Inject } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { PaymentService } from '../service/payment/payment.service';
import { BillingAddressModel } from '../model/billingaddress-model';
import { DOCUMENT } from '@angular/common';
import { CreateSusbcriptionTO } from '../dto/subscriptionTO';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    isAuthenticated: boolean;
    username: string;
    billingAddress: BillingAddressModel = new BillingAddressModel();

    constructor(private githubAuthService: GithubauthService, private paymentService: PaymentService, @Inject(DOCUMENT) private document:any) {
    }


    ngOnInit() {
        this.loggedIn();
    }

    loggedIn() {
        this.githubAuthService.isAuthenticated().subscribe(response => {
            if (response.status == 200) {
                this.isAuthenticated = true;
                this.githubAuthService.getCurrentUser().subscribe(username => {
                    this.username = username.username
                });
            }
        });
    }


    checkout(){
      let createAbonementTO: CreateSusbcriptionTO = new CreateSusbcriptionTO();
      createAbonementTO.amount = 10;
      createAbonementTO.billingAddress = this.billingAddress;

      this.paymentService.createSubscription(createAbonementTO).subscribe(redirectUrl => {
        this.document.location.href = redirectUrl;
      })
    }

}
