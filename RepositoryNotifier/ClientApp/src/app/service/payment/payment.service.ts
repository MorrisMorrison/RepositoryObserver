import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonement, CreateAbonementTO } from 'src/app/dto/abonementTO';
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

  createSubscription(createAbonementTO: CreateAbonementTO):Observable<string>{
    return this.httpClient.post<string>(this.baseUrl + "api/payment/createsubscription", createAbonementTO, {responseType: 'text' as 'json'})
  }

  getAbonement():Observable<Abonement>{
    return this.httpClient.get<Abonement>(this.baseUrl + "api/payment/getabonement");
  }

  getAllAbonements():Observable<Abonement>{
    return this.httpClient.get<Abonement>(this.baseUrl + "api/payment/getallabonements");
  }

  getAllDonations():Observable<Donation[]>{
    return this.httpClient.get<Donation[]>(this.baseUrl + "api/payment/getalldonations");
  }
}
