import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-form-component',
  standalone: false,
  templateUrl: './team-form-component.html',
  styleUrl: './team-form-component.css',
})
export class TeamFormComponent {




  formGroupTeams: FormGroup; // criando um formGroup
  
  constructor(private formBuilder: FormBuilder) { //usa injeção de dependências para
  //utilizar o formbuilder dentro do constructor

  this.formGroupTeams = formBuilder.group({ // constroi o objeto Product, de acordo com
  //sua interface já definida
    id: [''],
    name: [''],
    description: [''],
    price: ['']
    });

  }
}


