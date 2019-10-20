import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddJobTO } from 'src/app/dto/jobTO';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { AddContactTO } from 'src/app/dto/contactTO';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public baseUrl;
  public httpClient:HttpClient;
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.httpClient = http;
      this.baseUrl = baseUrl;
  }

  addContact(contact:AddContactTO):Observable<HttpResponse<string>>{
      return this.httpClient.post<string>(this.baseUrl + "api/contact/createcontact", contact, {observe: 'response'});
  }
}
