import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {UserTO} from "../../dto/userTO";
import {Inject, Injectable} from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT', 'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"})
};
// const headers = new HttpHeaders({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT', 'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"});

@Injectable({
  providedIn: 'root'
})

export class GithubauthService {

    public apiUrl = "api/auth/login";
    public baseUrl;
    public httpClient:HttpClient;
    // public headers = new HttpHeaders({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT', 'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"});


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.httpClient = http;
        this.baseUrl = baseUrl;
    }

    login():Observable<HttpResponse<string>>{
        return this.httpClient.get<string>(this.baseUrl + this.apiUrl, {observe: 'response', responseType: 'text' as 'json'});
    }

    logout(){
        return this.httpClient.get<void>(this.baseUrl + "api/auth/logout",  {observe: 'response'});
    }
    
    isAuthenticated(){
        return this.httpClient.get<void>(this.baseUrl + "api/auth/isauthenticated",  {observe: 'response'});
    }

    alreadyCreated(){
        return this.httpClient.get<void>(this.baseUrl + "api/auth/alreadycreated",  {observe: 'response'});
    }
    
    getCurrentUser():Observable<UserTO>{
        return this.httpClient.get<UserTO>(this.baseUrl + "api/auth/getcurrentuser");
    }
    getCurrentUsersRepositories():Observable<string[]>{
        return this.httpClient.get<string[]>(this.baseUrl + "api/auth/getcurrentusersrepositories");
    }
}
