import { Component, OnInit, Input } from '@angular/core';
import { Payment } from '../dto/subscriptionTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  @Input() payment: Payment;
  

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
