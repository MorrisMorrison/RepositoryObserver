import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.httpClient.post<string>(this.baseUrl +"api/payment/create", amount, {responseType: 'text' as 'json'});
  }

}
