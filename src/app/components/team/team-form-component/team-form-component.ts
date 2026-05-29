import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
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
      country: ['', Validators.required],

      fifaCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]{3}$') // exatamente 3 letras
        ]
      ],

      coach: ['', Validators.required],

      playerQuantity: [
        '',
        [
          Validators.required,
          Validators.min(7), // mínimo de jogadores
          Validators.pattern('^[0-9]+$') // apenas números
        ]
      ]
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
          Swal.fire({
            icon: 'success',
            title: 'Team Updated Succesfully!',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/teams']);
            }
          });
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
          Swal.fire({
            icon: 'success',
            title: 'Team Created Succesfully!',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/teams']);
            }
          });

        },
        error: (err) => {
          console.error('Erro ao salvar:', err);
        }

      });

    }
  }
}