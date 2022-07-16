import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/client.service';
import { SuperviseurService } from 'src/app/superviseur.service';
import {OrdreMissionCreation} from "../ordre-mission-creation";
@Component({
  selector: 'app-creation-ordre-mission',
  templateUrl: './creation-ordre-mission.component.html',
  styleUrls: ['./creation-ordre-mission.component.css']
})
export class CreationOrdreMissionComponent implements OnInit {
  creationOrdreForm!: FormGroup<OrdreMissionCreation>;
  sup_ready = false;
  client_ready = false;
  constructor(public client$ : ClientService,
               public superviseur$ : SuperviseurService) { }

  ngOnInit(): void {
    this.superviseur$.ready.then( ready => this.sup_ready = ready );
    this.client$.ready.then(ready => this.client_ready = ready );
    this.creationOrdreForm = new FormGroup<OrdreMissionCreation>({
      dateMission: new FormControl(new Date()),
      client: new FormControl({id:0,nom:"select",address:""}),
      superviseur: new FormControl({id:0,nom:"select",prenom:""}),
      descriptionMission: new FormControl(''),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.creationOrdreForm.value);
  }


}
