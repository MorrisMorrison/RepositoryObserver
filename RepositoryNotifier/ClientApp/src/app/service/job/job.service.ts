import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {GetJobTO, AddJobTO, UpdateJobTO, JobResultTO} from "../../dto/jobTO";

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
    
    createJob(job:AddJobTO):Observable<HttpResponse<string>>{
        return this.httpClient.post<string>(this.baseUrl + "api/job/createjob", job, {observe: 'response'});
    }

    getJobs():Observable<GetJobTO[]>{
        return this.httpClient.get<GetJobTO[]>(this.baseUrl + "api/job/getalljobs");
    }
    
    deleteJob(frequency: number):Observable<HttpResponse<string>>{
        return this.httpClient.delete<string>(this.baseUrl + "api/job/deletejob?frequency=" + frequency, {observe: 'response'});
    }

    getCommonKeywords():Observable<string[]>{
        return this.httpClient.get<string[]>(this.baseUrl + "api/job/getcommonkeywords");
    }

    updateJob(job:UpdateJobTO):Observable<HttpResponse<string>>{
        return this.httpClient.put<string>(this.baseUrl +"api/job/updatejob", job, {observe: 'response'});
    }

    getJobResults(frequency:number):Observable<JobResultTO[]>{
        return this.httpClient.get<JobResultTO[]>(this.baseUrl + "api/job/getjobresults?frequency=" + frequency);
    }

}



