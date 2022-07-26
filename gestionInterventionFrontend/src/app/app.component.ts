import { Component } from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export  function getMaxValidator(sup:string,controlName:string): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const c = control.get(controlName);
    const s = control.get(sup);
    const error = c?.getError("min");
    if(c?.value){
      if(s?.value){
        if (c.value > s.value){
          c?.setErrors({"max": false});
          return {"valid":false};
        }
        c?.setErrors((error)? {"min":error}: null)
        return null;
      }else {
        c?.setErrors((error)? {"min":error}: {"max": false})
        return {"valid":false};
      }
    }
    c?.setErrors(null);
    return null;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _adapter: DateAdapter<any>){
    this._adapter.setLocale('tn');
  }

}
