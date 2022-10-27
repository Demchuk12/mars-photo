import { AbstractControl } from "@angular/forms";

export function OpportunityValidator(control: AbstractControl) {
  if(typeof +control.value === 'number' && !isNaN(+control.value) && control.value < 5111 ) {
    return null;
  }
  return { invalidUrl: true };

}
