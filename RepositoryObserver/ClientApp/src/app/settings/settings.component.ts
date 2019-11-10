import { Component, OnInit } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { PaymentService } from '../service/payment/payment.service';
import { Subscription } from '../dto/subscriptionTO';
import { AlertifyService } from '../service/alertify/alertify.service';

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

  constructor(private paymentService:PaymentService,private githubAuthService: GithubauthService , private alertifySerivce: AlertifyService) {
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
    this.alertifySerivce.confirm("Cancel Subscription?", "Do you really want to cancel your subscription?", () => {
      this.paymentService.cancelSubscription().subscribe(response => {
        if (response.status == 200) {
          this.alertifySerivce.success("Subscription successfully cancelled.");
      }else{
        this.alertifySerivce.error("An error occurred. Please contact our support team if this error persists.");
      }
      });
    });
  }

  save(){
    console.log(this.subscription.billingAddress);
    this.paymentService.updateBillingAddress(this.subscription.billingAddress).subscribe(response => {
      if (response.status == 200) {
        this.alertifySerivce.success("Billing Address successfully updated.");
        this.getAllPayments();
    }else{
      this.alertifySerivce.error("An error occurred. Please contact our support team if this error persists.");
    }
    })
  }

}
