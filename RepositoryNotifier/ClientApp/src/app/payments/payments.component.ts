import { Component, OnInit } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { PaymentService } from '../service/payment/payment.service';
import { Abonement } from '../dto/abonementTO';
import { Donation } from '../dto/donationTO';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  username: string;
  isAuthenticated: boolean;
  abonement:Abonement;
  donations:Donation[] = [];

  constructor(private githubAuthService: GithubauthService, private paymentService: PaymentService) { }

  ngOnInit() {
    this.loggedIn();
  }

  loggedIn() {
    this.githubAuthService.isAuthenticated().subscribe(response => {
      if (response.status == 200) {
        this.isAuthenticated = true;
        this.githubAuthService.getCurrentUser().subscribe(currentUser => {
          this.username = currentUser.username;
        });
        this.getAllPayments();
      }
    });

  }

  getAllPayments(){
    this.paymentService.getAbonement().subscribe(abonement => {
      this.abonement = abonement;
    });
    this.paymentService.getAllDonations().subscribe(donations => {
      this.donations = donations;
    });

  }

}

