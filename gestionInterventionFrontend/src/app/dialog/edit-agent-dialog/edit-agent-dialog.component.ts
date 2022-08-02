import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AgentAdministratif} from "../../model/agent-administratif";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-agent',
  template:`
  <form [formGroup]="agentControl">
    <mat-form-field appearance="legacy">
      <mat-label> id </mat-label>
      <input matInput readonly formControlName="id">
    </mat-form-field>
    <mat-form-field appearance="legacy">
      <mat-label>nom</mat-label>
      <input matInput formControlName="nom">
    </mat-form-field>
    <mat-form-field appearance="legacy">
      <mat-label>prenom</mat-label>
      <input matInput formControlName="prenom">
    </mat-form-field>
  </form>
  <button mat-button [mat-dialog-close]="null">Annuller</button>
  <button mat-button [disabled]="!agentControl.valid"  [mat-dialog-close]="agentControl.value" >Ok</button>
  `,
  styles: ['']
})
export class EditAgentDialogComponent implements OnInit {

  agentControl!: FormGroup<{id: FormControl<number>, nom: FormControl, prenom: FormControl}>

  constructor(@Inject(MAT_DIALOG_DATA) private agent: AgentAdministratif) { }

  ngOnInit(): void {
    this.agentControl=new FormGroup({
      id: new FormControl<number>(this.agent.id,{nonNullable:true}),
      nom: new FormControl(this.agent.nom,Validators.required),
      prenom: new FormControl(this.agent.prenom,Validators.required)
    });
  }

}
