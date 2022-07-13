import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  host:string="http://localhost:8080/";
  constructor(private http:HttpClient) { }

  sendGetRequest<T>(url: string, params?:HttpParams):Observable<T>{
    return this.http.get<T>(this.host+url,{params:params});
  }
  sendPostRequest<T>(url: string, params?: HttpParams, body?: any):Observable<T>{
    return this.http.post<T>(this.host+url,body,{params:params});
  }
  sendPutRequest<T>(url: string, params: HttpParams, body: T):Observable<T>{
    return this.http.put<T>(this.host+url,body,{params:params});
  }
  sendDeleteRequest<T>(url: string, params: HttpParams):Observable<T>{
    return this.http.delete<T>(this.host+url,{params:params});
  }

}
