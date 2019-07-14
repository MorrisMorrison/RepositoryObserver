import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {GetNotificationTO, AddNotificationTO, UpdateNotificationTO, NotificationResultTO} from "../../dto/notificationTO";

@Injectable({
  providedIn: 'root'
})
export class JobService {

    public baseUrl;
    public httpClient:HttpClient;
    
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }

    getFrequencies():Observable<number[]>{
        return this.httpClient.get<number[]>(this.baseUrl + "api/frequency/getfrequencies");
    }
    
    createNotification(notification:AddNotificationTO):Observable<HttpResponse<string>>{
        return this.httpClient.post<string>(this.baseUrl + "api/job/createjob", notification, {observe: 'response'});
    }

    getNotifications():Observable<GetNotificationTO[]>{
        return this.httpClient.get<GetNotificationTO[]>(this.baseUrl + "api/job/getalljobs");
    }
    
    deleteNotification(frequency: number):Observable<HttpResponse<string>>{
        return this.httpClient.delete<string>(this.baseUrl + "api/job/deletejob?frequency=" + frequency, {observe: 'response'});
    }

    getCommonKeywords():Observable<string[]>{
        return this.httpClient.get<string[]>(this.baseUrl + "api/job/getcommonkeywords");
    }

    updateNotification(notification:UpdateNotificationTO):Observable<HttpResponse<string>>{
        return this.httpClient.put<string>(this.baseUrl +"api/job/updatejob", notification, {observe: 'response'});
    }

    getNotificationResults(frequency:number):Observable<NotificationResultTO[]>{
        return this.httpClient.get<NotificationResultTO[]>(this.baseUrl + "api/job/getjobresults?frequency=" + frequency);
    }

}



