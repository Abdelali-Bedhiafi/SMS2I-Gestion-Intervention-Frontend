import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { SuperviseurService } from 'src/app/service/superviseur.service';
import {OrdreMissionCreation} from "../model/ordre-mission-creation";
import {Observable} from "rxjs";
import {Superviseur} from "../../model/superviseur";
import {Client} from "../../model/client";


@Component({
  selector: 'app-creation-ordre-mission',
  templateUrl: './creation-ordre-mission.component.html',
  styleUrls: ['./creation-ordre-mission.component.css']
})
export class CreationOrdreMissionComponent implements OnInit {
  creationOrdreForm!: FormGroup<OrdreMissionCreation>;
  superviseur$!: Observable<Superviseur[]>;
  client$!: Observable<Client[]>;

  constructor(private client : ClientService,
              private superviseur : SuperviseurService) { }

  ngOnInit(): void {
    this.superviseur$ = this.superviseur.getAll();
    this.client$ = this.client.getAll();
    this.creationOrdreForm = new FormGroup<OrdreMissionCreation>({
      dateMission: new FormControl(new Date()),
      client: new FormControl(null,Validators.required),
      superviseur: new FormControl(null,Validators.required),
      descriptionMission: new FormControl(''),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.creationOrdreForm.value);
  }


}
