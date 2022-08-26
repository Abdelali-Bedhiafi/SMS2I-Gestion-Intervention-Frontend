import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css']
})
export class AddAgentDialogComponent implements OnInit {
  agentControl!: FormGroup<{nom: FormControl, prenom: FormControl, password: FormControl}>;

  constructor() { }

  ngOnInit(): void {
    this.agentControl= new FormGroup({
      nom: new FormControl('',{validators: Validators.required,updateOn:"change"}),
      prenom: new FormControl('',{validators: Validators.required, updateOn:"change"}),
      password: new FormControl('',{validators:[Validators.required, Validators.minLength(4)]})

    });
  }

}
