import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {filter, tap} from "rxjs";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  logged!: {id: number,role: string};

  constructor(private http: HttpClient,
              private router: Router) { }

  login(credential: {id:number,password:string}) {
    const param = new HttpParams()
      .append('id', credential.id)
      .append('password', credential.password);
    return this.http.get("http://localhost:8080/auth",{params:param,responseType:'text'}).pipe(
      tap(respond => {
        if(respond!='INVALID') this.logged= {
          id: credential.id,
          role:respond
        };
      })
    );
  }

  getRole():string {
    return this.logged.role;
  }

  getId():number {
    return this.logged.id;
  }

  canActivate(){
    return this.logged ? true : this.router.parseUrl("/login");
  }
}
