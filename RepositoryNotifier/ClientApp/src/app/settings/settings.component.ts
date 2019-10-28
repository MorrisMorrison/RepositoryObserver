import { Component, OnInit } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { PaymentService } from '../service/payment/payment.service';
import { Subscription } from '../dto/subscriptionTO';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  accountViewActive:boolean=true;
  isAuthenticated: boolean;
  username: string;
  subscription:Subscription;

  constructor(private paymentService:PaymentService,private githubAuthService: GithubauthService) {
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
              this.getAllPayments();
          }
      });
  }

  getAllPayments(){
    this.paymentService.getAllSubscriptions().subscribe(subscription => {
      this.subscription = subscription;
  });
  }

  cancelSubscription(){
    this.paymentService.cancelSubscription().subscribe(response => {
      if (response.status == 200) {
        this.isAuthenticated = true;
        this.githubAuthService.getCurrentUser().subscribe(username => {
            this.username = username.username
        });
        this.getAllPayments();
    }
    });
  }

}
