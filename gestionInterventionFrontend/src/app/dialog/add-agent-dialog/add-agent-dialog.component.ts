import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css']
})
export class AddAgentDialogComponent implements OnInit {
  agentControl!: FormGroup<{nom: FormControl, prenom: FormControl}>;

  constructor() { }

  ngOnInit(): void {
    this.agentControl= new FormGroup({
      nom: new FormControl(null,{validators: Validators.required,updateOn:"change"}),
      prenom: new FormControl(null,{validators: Validators.required, updateOn:"change"})
    });
  }

}
