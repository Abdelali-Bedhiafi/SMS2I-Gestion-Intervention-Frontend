import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {
  clientControl!: FormGroup<{nom: FormControl, address: FormControl}>;

  constructor() { }

  ngOnInit(): void {
    this.clientControl = new FormGroup({
      nom: new FormControl(null,{validators: Validators.required,updateOn:"change"}),
      address: new FormControl(null,{validators: Validators.required,updateOn:"change"})
    })
  }

}
