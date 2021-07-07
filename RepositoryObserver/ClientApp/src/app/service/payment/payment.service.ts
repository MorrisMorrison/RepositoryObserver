import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription, CreateSusbcriptionTO, BillingAddressTO } from 'src/app/dto/subscriptionTO';
import { Donation } from 'src/app/dto/donationTO';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public baseUrl;
  public httpClient: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.baseUrl = baseUrl;
  }

  createPayment(amount: number):Observable<string>{
    return this.httpClient.post<string>(this.baseUrl +"api/payment/createpayment", amount, {responseType: 'text' as 'json'});
  }

  createSubscription(createSubscriptionTO: CreateSusbcriptionTO):Observable<string>{
    return this.httpClient.post<string>(this.baseUrl + "api/payment/createsubscription", createSubscriptionTO, {responseType: 'text' as 'json'})
  }

  getSubscription():Observable<Subscription>{
    return this.httpClient.get<Subscription>(this.baseUrl + "api/payment/getsubscription");
  }

  getAllSubscriptions():Observable<Subscription>{
    return this.httpClient.get<Subscription>(this.baseUrl + "api/payment/getallsubscriptions");
  }

  getAllDonations():Observable<Donation[]>{
    return this.httpClient.get<Donation[]>(this.baseUrl + "api/payment/getalldonations");
  }

  cancelSubscription():Observable<HttpResponse<string>>{
    return this.httpClient.put<string>(this.baseUrl +"api/payment/cancelsubscription","", {observe: 'response'});
  }

  updateBillingAddress(billingAddressTO: BillingAddressTO):Observable<HttpResponse<string>>{
    return this.httpClient.put<string>(this.baseUrl +"api/payment/updatebillingaddress", billingAddressTO, {observe: 'response'});
  }

}
