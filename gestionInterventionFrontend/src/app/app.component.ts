import { Component } from '@angular/core';
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _adapter: DateAdapter<any>){
    this._adapter.setLocale('tn');
  }
}
