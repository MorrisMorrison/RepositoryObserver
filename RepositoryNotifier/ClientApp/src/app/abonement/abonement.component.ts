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

  private proAboPrice: number = 1;
  private businessAboPrice: number = 2;

  constructor(private githubAuthService: GithubauthService,
    @Inject(DOCUMENT) private document: any,
    private alertifyService: AlertifyService,
    private paymentService: PaymentService) { }

  ngOnInit() {
  }

  login() {
    this.githubAuthService.login().subscribe(response => {
      this.document.location.href = response.url;
      this.alertifyService.success("Logged in.");
    });
  }

  createProAbo(){
    this.createPayment(this.proAboPrice);
  }

  createBusinessAbo(){
    this.createPayment(this.businessAboPrice);
  }

  createPayment(amount: number) {
    this.paymentService.createPayment(amount).subscribe(redirectUrl => {
      this.document.location.href = redirectUrl;
    });
  }
}
