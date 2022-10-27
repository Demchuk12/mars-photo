import { AbstractControl } from "@angular/forms";

export function SpiritValidator(control: AbstractControl) : {[key: string]: boolean} | null {
  if(typeof +control.value === 'number' && !isNaN(+control.value) && control.value < 2208 ) {
    return null
  }

  return {'isnumber': false}
}
