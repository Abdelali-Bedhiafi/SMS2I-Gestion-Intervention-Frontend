import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginControl= new FormGroup({
    id: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.loginControl.value as {id:string,password:string}).subscribe(respond =>{
      if(respond){
        this.router.navigate(['/home']).then();
      }
      else{
        this.loginControl.reset();
      }
    })

  }
}
