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
        return this.httpClient.post<string>(this.baseUrl + "api/notificationtask/addnotification", notification, {observe: 'response'});
    }

    getNotifications():Observable<GetNotificationTO[]>{
        return this.httpClient.get<GetNotificationTO[]>(this.baseUrl + "api/notificationtask/getallnotifications");
    }
    
    deleteNotification(frequency: number){
        return this.httpClient.delete(this.baseUrl + "api/notificationtask/deletenotification?frequency=" + frequency);
    }

    getCommonKeywords():Observable<string[]>{
        return this.httpClient.get<string[]>(this.baseUrl + "api/notificationtask/getcommonkeywords");
    }

    updateNotification(notification:UpdateNotificationTO){
        return this.httpClient.put(this.baseUrl +"api/notificationtask/updatenotification", notification);
    }
    
}



