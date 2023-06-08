// import { Injectable } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

// @Injectable({
//   providedIn: 'root'
// })
// export class FormGroupService {

//   constructor() { }

//   trimFormValues(formGroup :FormGroup){
//     Object.keys(formGroup.controls).forEach(key =>{
//       if(formGroup.controls[key].value != null){
//         formGroup.controls[key].setValue( formGroup.controls[key].value.trim() )
//       }
//     })
//     return formGroup
//   }

//   checkForm(formGroup :FormGroup): boolean {
//     var isBlank = false
//     Object.keys(formGroup.controls).forEach(key =>{
//       if(formGroup.controls[key].value != null){

//         formGroup.controls[key].setValue( formGroup.controls[key].value.trim() )
//         if( formGroup.controls[key].value != "" ){
//           isBlank = true
//         }
//       }
//     })
//     return isBlank;
//   }

//   checkOneControl(control : string) : boolean{
//     var mar = " djdjd"
//     var isBlank = false
//     if(control != null){

//       control = control.trim()
//       if( control != "" ){
//         isBlank = true
//       }
//     }
//     return isBlank
//   }
// }



import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {

  constructor() { }

  trimFormValues(formGroup: FormGroup): FormGroup {
    const trimmedFormGroup = new FormGroup({});
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      const trimmedValue = this.trimControlValue(control.value);
      trimmedFormGroup.addControl(key, new FormControl(trimmedValue));
    });
    return trimmedFormGroup;
  }

  checkForm(formGroup: FormGroup): boolean {
    let isBlank = false;
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control.value !== null && control.value !== undefined) {
        const trimmedValue = this.trimControlValue(control.value);
        control.setValue(trimmedValue);
        if (trimmedValue !== '') {
          isBlank = true;
        }
      }
    });
    return isBlank;
  }

  checkOneControl(control: string): boolean {
    let isBlank = false;
    if (typeof control === 'string') {
      const trimmedValue = control.trim();
      if (trimmedValue !== '') {
        isBlank = true;
      }
    } else {
      console.log('Control is not a string:', control);
    }
    return isBlank;
  }



  trimControlValue(value: any): any {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }


}

