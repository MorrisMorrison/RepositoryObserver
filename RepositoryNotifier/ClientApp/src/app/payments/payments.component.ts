import { Component, OnInit } from '@angular/core';
import { GithubauthService } from '../service/githubauth/githubauth.service';
import { PaymentService } from '../service/payment/payment.service';
import { Abonement, Payment } from '../dto/abonementTO';
import { Donation } from '../dto/donationTO';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditJobComponent } from '../edit-job/edit-job.component';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [DatePipe]
})
export class PaymentsComponent implements OnInit {

  username: string;
  isAuthenticated: boolean;
  abonement:Abonement;
  donations:Donation[] = [];

  constructor(private githubAuthService: GithubauthService, private paymentService: PaymentService, private modalService: NgbModal) { }

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
    this.paymentService.getAllAbonements().subscribe(abonement => {
      this.abonement = abonement;
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

