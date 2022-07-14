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
  techniciens!: Technicien[];
  ordresMission!: OrdreMission[];
  clients!: Client[];
  selectedTechnicienId!:number;
  selectedOrdreMissionId!:number;


  constructor(private technicien: TechnicienService,
              private ordreMission: OrdreMissionService,
              private client: ClientService
            ) { }

  ngOnInit(): void {
    this.technicien.getAll().subscribe(data => {
      this.techniciens=data;
      this.selectedTechnicienId=data[0].id;
    });
    this.ordreMission.getAll().subscribe(data => {
      this.ordresMission=data;
      this.selectedOrdreMissionId=data[0].id;
    });
    this.client.getAll().subscribe(data=>{
      this.clients=data;
    })
  }

  affecter(){
    if(this.selectedTechnicienId  && this.selectedOrdreMissionId){
      console.log("test");
      /*let param = new HttpParams().appendAll({"missionId":this.selectedOrdreMissionId,"technicienId":this.selectedTechnicienId});
      this.http.post<OrdreMission>("http://localhost:8080/mission/affecter",null,{params:param})
      .subscribe(ordreMission=>{
        console.log(ordreMission.id);
      });*/
      this.ordreMission.affecter(this.selectedOrdreMissionId,this.selectedTechnicienId).subscribe(mission=>{
        console.log(mission);
        this.ordreMission.getAll().subscribe(data=>{
          this.ordresMission=data;
        })
      });
    }
  }

}
