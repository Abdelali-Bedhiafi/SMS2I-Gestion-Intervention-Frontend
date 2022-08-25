import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {HttpParams} from "@angular/common/http";
import {tap} from "rxjs";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  logged: boolean= false;

  constructor(private backend: BackendService,
              private router: Router) { }

  login(credential: {id:string,password:string}) {
    const param = new HttpParams()
      .append('id', credential.id)
      .append('password', credential.password);
    return this.backend.sendGetRequest<boolean>("auth",param).pipe(tap(respond => this.logged=respond));
  }

  canActivate(){
    return this.logged ? true : this.router.parseUrl("/login");
  }
}
