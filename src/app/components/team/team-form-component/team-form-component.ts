import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Team } from '../../../models/TeamInterface';
import { TeamService } from '../../../services/team-service';

@Component({
  selector: 'app-team-form-component',
  standalone: false,
  templateUrl: './team-form-component.html',
  styleUrl: './team-form-component.css',
})
export class TeamFormComponent implements OnInit {



  Teams = signal<Team[]>([]);
  formGroupTeams: FormGroup; // criando um formGroup
  
  constructor(private formBuilder: FormBuilder, private service: TeamService) { //usa injeção de dependências para
  //utilizar o formbuilder dentro do constructor

  this.formGroupTeams = formBuilder.group({ // constroi o objeto Product, de acordo com
  //sua interface já definida
    id: [''],
    country: [''],
    fifaCode: [''],
    coach: [''],
    playersQuantity: ['']
    });

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
save() {

    this.service.save(this.formGroupTeams.value).subscribe(
      {
        next: json => {
          this.Teams.update(t => [...t, json]); // atualiza o Signal
          this.formGroupTeams.reset(); // reseta o form
        }
      }
    )}
 
}


