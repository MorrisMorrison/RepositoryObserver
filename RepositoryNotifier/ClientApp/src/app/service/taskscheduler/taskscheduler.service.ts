import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {GetNotificationTO, AddNotificationTO, UpdateNotificationTO} from "../../dto/notificationTO";

@Injectable({
  providedIn: 'root'
})
export class TaskschedulerService {

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
        return this.httpClient.post<string>(this.baseUrl + "api/repositoryinspectorjob/createrepositoryinspectorjob", notification, {observe: 'response'});
    }

    getNotifications():Observable<GetNotificationTO[]>{
        return this.httpClient.get<GetNotificationTO[]>(this.baseUrl + "api/repositoryinspectorjob/getallrepositoryinspectorjobs");
    }
    
    deleteNotification(frequency: number):Observable<HttpResponse<string>>{
        return this.httpClient.delete<string>(this.baseUrl + "api/repositoryinspectorjob/deleterepositoryinspectorjob?frequency=" + frequency, {observe: 'response'});
    }

    getCommonKeywords():Observable<string[]>{
        return this.httpClient.get<string[]>(this.baseUrl + "api/repositoryinspectorjob/getcommonkeywords");
    }

    updateNotification(notification:UpdateNotificationTO):Observable<HttpResponse<string>>{
        return this.httpClient.put<string>(this.baseUrl +"api/repositoryinspectorjob/updaterepositoryinspectorjob", notification, {observe: 'response'});
    }
    
}



