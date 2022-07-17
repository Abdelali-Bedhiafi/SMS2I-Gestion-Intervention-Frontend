import { Component } from '@angular/core';
import { ClientService } from './service/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public client: ClientService){}
}
