import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddJobTO, GetJobTO, JobResultTO, UpdateJobTO} from "../../dto/jobTO";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public baseUrl;
  public httpClient:HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.baseUrl = baseUrl;
  }

  getDataDump():Observable<string[]>{
    return this.httpClient.get<string[]>(this.baseUrl + "api/settings/getdatadump");
  }
}
