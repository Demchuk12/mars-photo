import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger, useAnimation } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpportunityValidator } from 'src/app/validators/opportunityValidator';
import { SpiritValidator } from 'src/app/validators/spiritValidator';
import { CuriosityValidator } from 'src/app/validators/curiosityValidator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 }))
      ])
    ])
  ]

})
export class HomePageComponent implements OnInit {
  opportunityForm!: FormGroup;
  spiritForm!: FormGroup;
  curiosityForm!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.opportunityForm = new FormGroup({
      camera: new FormControl('FHAZ',[
        Validators.required
      ]),
      sol: new FormControl('',[
        Validators.required,
        OpportunityValidator
      ])
    });

    this.spiritForm = new FormGroup({
      camera: new FormControl('FHAZ',[
        Validators.required
      ]),
      sol: new FormControl('',[
        Validators.required,
        SpiritValidator
      ])
    });

    this.curiosityForm =  new FormGroup({
      camera: new FormControl('FHAZ',[
        Validators.required
      ]),
      sol: new FormControl('',[
        Validators.required,
        CuriosityValidator
      ])
    });
  }

  opportunitySubmit(): void {
    if(this.opportunityForm.valid){
      const formData = {...this.opportunityForm.value}
      formData['rover'] = 'opportunity';
      this.router.navigate(
        ['/photo'],
        { queryParams: {
          sol: formData.sol,
          camera: formData.camera,
          rover: formData.rover
        }}
      )
    }
  }

  spiritSubmit(): void {
    if(this.spiritForm.valid){
      const formData = {...this.spiritForm.value}
      formData['rover'] = 'spirit';
      this.router.navigate(
        ['/photo'],
        { queryParams: {
          sol: formData.sol,
          camera: formData.camera,
          rover: formData.rover
        }}
      )
    }
  }

  curiositySubmit(): void {
    if(this.curiosityForm.valid){
      const formData = {...this.curiosityForm.value}
      formData['rover'] = 'curiosity';
      this.router.navigate(
        ['/photo'],
        { queryParams: {
          sol: formData.sol,
          camera: formData.camera,
          rover: formData.rover
        }}
      )
    }
  }

}
