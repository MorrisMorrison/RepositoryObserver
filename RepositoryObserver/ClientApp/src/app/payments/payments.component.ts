import { Component, OnInit, Inject } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { PaymentService } from '../service/payment/payment.service';
import { Subscription, Payment } from '../dto/subscriptionTO';
import { Donation } from '../dto/donationTO';
import { DatePipe, DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditJobComponent } from '../edit-job/edit-job.component';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [DatePipe]
})
export class PaymentsComponent implements OnInit {

  
  username: string;
  isAuthenticated: boolean;
  subscription:Subscription;
  donations:Donation[] = [];
  changeText = {
    changeText: false
  }

  constructor(private githubAuthService: GithubauthService, private paymentService: PaymentService, private modalService: NgbModal, @Inject(DOCUMENT) document) { }

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
    this.paymentService.getAllSubscriptions().subscribe(subscription => {
      this.subscription = subscription;

    });
    this.paymentService.getAllDonations().subscribe(donations => {
      this.donations = donations;
    });
  }

  viewPaymentDetails(payment: Payment){
      const modalRef = this.modalService.open(PaymentDetailsComponent);
      modalRef.componentInstance.payment = payment;
  }

}

