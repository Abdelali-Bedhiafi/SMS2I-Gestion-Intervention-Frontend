import { Component, OnInit } from '@angular/core';
import { OrdreMissionService} from 'src/app/service/ordre-mission.service';
import {Observable} from "rxjs";
import {OrdreMission} from "../model/ordre-mission";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ordre$!:Observable<OrdreMission[]>
  constructor(private ordre:  OrdreMissionService) { }

  ngOnInit(): void {
    this.ordre$=this.ordre.getAll();
  }


}




