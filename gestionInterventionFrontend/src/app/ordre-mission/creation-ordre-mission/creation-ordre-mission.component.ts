import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { SuperviseurService } from 'src/app/service/superviseur.service';
import {OrdreMissionCreation} from "../model/ordre-mission-creation";
import {Superviseur} from "../../model/superviseur";
import {Client} from "../../model/client";
import {OrdreMissionService} from "../service/ordre-mission.service";
import {Router} from "@angular/router";

export interface OrdreMissionCreationForm{
  descriptionMission: FormControl<string|null>;
  dateMission: FormControl<Date>;
  client?: FormControl<Client>;
  superviseur?: FormControl<Superviseur>;
}

@Component({
  selector: 'app-creation-ordre-mission',
  templateUrl: './creation-ordre-mission.component.html',
  styleUrls: ['./creation-ordre-mission.component.css']
})
export class CreationOrdreMissionComponent implements OnInit {

  creationOrdreForm!: FormGroup<OrdreMissionCreationForm>;
  superviseurs!: Superviseur[];
  clients!: Client[];

  superviseurReady = false;
  clientReady = false;

  constructor(private client : ClientService,
              private superviseur : SuperviseurService,
              private ordreMission : OrdreMissionService,
              private router : Router) { }

  ngOnInit(): void {
    this.creationOrdreForm = new FormGroup({
      dateMission: new FormControl(new Date(),{nonNullable:true}),
      descriptionMission: new FormControl(''),
    });
    this.superviseur.getAll().subscribe(data=>{
      this.superviseurs=data;
      this.creationOrdreForm.setControl("superviseur",new FormControl(data[0],{nonNullable:true,validators:Validators.required}));
      this.superviseurReady=true;
    });
    this.client.getAll().subscribe(data =>{
      this.clients=data;
      this.creationOrdreForm.setControl("client",new FormControl(data[0],{nonNullable:true,validators:Validators.required}));
      this.clientReady=true;
    });


  }

  onSubmit() {
    if (this.creationOrdreForm.valid){
      const value = this.creationOrdreForm.value;
      const ordre: OrdreMissionCreation = {
        client: (value.client)? value.client : this.clients[0],
        superviseur: (value.superviseur)? value.superviseur : this.superviseurs[0],
        descriptionMission: (value.descriptionMission)? value.descriptionMission : '',
        dateMission: (value.dateMission)? value.dateMission : new Date()
      };
      this.ordreMission.create(ordre).subscribe(mission =>{
        this.router.navigate(['detail', mission.id]).then(()=> console.timeLog('creation mission',mission));
      });
    }
  }


}
