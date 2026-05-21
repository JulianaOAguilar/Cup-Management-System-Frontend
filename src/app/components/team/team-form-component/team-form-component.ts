import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Team } from '../../../models/TeamInterface';
import { TeamService } from '../../../services/team-service';

@Component({
  selector: 'app-team-form-component',
  standalone: false,
  templateUrl: './team-form-component.html',
  styleUrl: './team-form-component.css',
})
export class TeamFormComponent implements OnInit {

  isEditMode = false;
  teamId?: number;

  Teams = signal<Team[]>([]);

  formGroupTeams: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.formGroupTeams = this.formBuilder.group({
      id: [''],
      country: [''],
      fifaCode: [''],
      coach: [''],
      playerQuantity: ['']
    });

  }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {

      this.teamId = Number(idParam);
      this.isEditMode = true;

      this.service.getById(this.teamId).subscribe({
        next: (team: Team) => {
          this.formGroupTeams.patchValue(team);
        },
        error: (err) => {
          console.error('Erro ao buscar time:', err);
        }
      });

    }
  }

  save(): void {

    if (this.isEditMode) {

      this.service.update(this.teamId!, this.formGroupTeams.value).subscribe({
        next: () => {
          console.log('Time atualizado com sucesso');
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
        }
      });

    } else {

      this.service.save(this.formGroupTeams.value).subscribe({
        next: (json: Team) => {
          this.Teams.update(t => [...t, json]);
          this.formGroupTeams.reset();
          
        },
        error: (err) => {
          console.error('Erro ao salvar:', err);
        }
      });

    }
  }
}