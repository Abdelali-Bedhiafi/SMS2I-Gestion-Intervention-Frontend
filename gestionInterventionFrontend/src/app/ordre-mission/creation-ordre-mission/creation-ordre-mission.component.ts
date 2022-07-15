import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/client.service';
import { SuperviseurService } from 'src/app/superviseur.service';
@Component({
  selector: 'app-creation-ordre-mission',
  templateUrl: './creation-ordre-mission.component.html',
  styleUrls: ['./creation-ordre-mission.component.css']
})
export class CreationOrdreMissionComponent implements OnInit {
  creationOrdreForm!: FormGroup;
  constructor(public client$ : ClientService,
               public superviseur$ : SuperviseurService) { }

  ngOnInit(): void {
    this.creationOrdreForm = new FormGroup({
      dateDemande: new FormControl(''),
      client : new FormControl(this.client$.clients.values().next().value),
      superviseur: new FormControl(this.superviseur$.superviseurs.values().next().value),
      descriptionDemande: new FormControl(''),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.creationOrdreForm.value);
  }


}
