import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {OrdreMissionService} from "../ordre-mission.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  missionReady = false;
  constructor(public mission$: OrdreMissionService) { }

  ngOnInit(): void {
    this.mission$.ready.then( ready=> this.missionReady=ready);
  }

}
