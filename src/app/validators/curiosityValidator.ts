import { AbstractControl } from "@angular/forms";

export function CuriosityValidator(control: AbstractControl) {
  if(typeof +control.value === 'number' && !isNaN(+control.value) && control.value < 3633 ) {
    return null;
  }
  return { invalidUrl: true };
}
