import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  role = "";
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.role = this.auth.getRole();
  }

}
