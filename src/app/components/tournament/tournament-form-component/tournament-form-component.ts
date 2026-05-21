import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentService } from '../../../services/tournament-service';
import { Tournament } from '../../../models/TournamentInterface';

@Component({
  selector: 'app-tournament-form-component',
  standalone: false,
  templateUrl: './tournament-form-component.html',
  styleUrl: './tournament-form-component.css',
})
export class TournamentFormComponent implements OnInit {

  Tournaments = signal<Tournament[]>([]);
  formGroupTournaments: FormGroup; // criando um formGroup
  
  constructor(private formBuilder: FormBuilder, private service: TournamentService) { //usa injeção de dependências para
  //utilizar o formbuilder dentro do constructor

  this.formGroupTournaments = formBuilder.group({ // constroi o objeto Product, de acordo com
  //sua interface já definida
    id: [''],
    fifaCode1: [''],
    fifaCode2: [''],
    location: [''],
    date: [''],
    time: ['']
    });

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
save() {

    this.service.save(this.formGroupTournaments.value).subscribe(
      {
        next: json => {
          this.Tournaments.update(t => [...t, json]); // atualiza o Signal
          this.formGroupTournaments.reset(); // reseta o form
        }
      }
    )}




}
