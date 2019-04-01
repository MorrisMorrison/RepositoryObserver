import { Component, OnInit, Inject } from '@angular/core';
import { PaymentService } from '../service/payment/payment.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  amount:number;

  constructor(private paymentService:PaymentService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  createDonation() {
    this.paymentService.createPayment(this.amount).subscribe(redirectUrl => {
      this.document.location.href = redirectUrl;
    });
  }

}
