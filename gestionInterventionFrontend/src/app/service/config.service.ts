import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Config} from "../model/config";



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config!: Config;

  constructor(private http: HttpClient) { }



  public load(){
    return new Promise((resolve, reject)=>{
      this.http.get<Config>('../assets/env.json').subscribe(config => {
        this.config=config;
        resolve(this)
      },
        reason => reject(reason));
    });
  }

}
