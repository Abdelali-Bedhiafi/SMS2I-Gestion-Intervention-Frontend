import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import {ConfigService} from "./config.service";
import {Config} from "../model/config";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  config$: Config;
  constructor(private http:HttpClient,private config:ConfigService) {
    this.config$ = config.config;
  }

  sendGetRequest<T>(url: string, params?:HttpParams):Observable<T>{
    return this.http.get<T>(this.config$.backend_url+url,{params:params});
  }
  sendPostRequest<T>(url: string, body?: any, param?: HttpParams):Observable<T>{
    return this.http.post<T>(this.config$.backend_url+url,body,{params:param});
  }
  sendPutRequest<T>(url: string, body: any, params?: HttpParams):Observable<T>{
    return this.http.put<T>(this.config$.backend_url+url,body,{params:params});
  }
  sendDeleteRequest<T>(url: string, params?: HttpParams):Observable<T>{
    return this.http.delete<T>(this.config$.backend_url+url,{params:params});
  }

  uploadFile(data: FormData,path: string):Observable<HttpEvent<Object>>{
    return  this.http.post(this.config$.backend_url+path,data,{
      reportProgress: true,
      observe: 'events'
    });
  }
}
