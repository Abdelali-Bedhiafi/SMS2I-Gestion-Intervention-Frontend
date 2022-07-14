import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { OrdreMission } from '../ordre-mission';
import { OrdreMissionService } from '../ordre-mission.service';
import { Technicien } from '../technicien';
import { TechnicienService } from '../technicien.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {



  constructor(public technicien: TechnicienService,
              public ordreMission: OrdreMissionService,
              public client: ClientService
            ) { }

  ngOnInit(): void {

  }



}
