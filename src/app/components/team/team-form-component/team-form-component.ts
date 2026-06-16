import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
          Validators.pattern('^[A-Za-z]{3}$') // 3 letras
        ]
      ],

      coach: ['', Validators.required],

      playerQuantity: [
        '',
        [
          Validators.required,
          Validators.min(7),
          Validators.max(30)
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
          Swal.fire('Error', 'Failed to load team', 'error');
        }
      });
    }
  }

  save(): void {

    const v = this.formGroupTeams.value;
    
    
    if (v.players < 7 || v.players > 30) {
      Swal.fire(
        'Invalid Players',
        'Players must be between 7 and 30',
        'error'
      );
      return;
    }

   
    if (this.formGroupTeams.invalid) {
      this.formGroupTeams.markAllAsTouched();
      Swal.fire(
        'Invalid Form',
        'Please fill all required fields correctly',
        'error'
      );
      return;
    }

    const request$ = this.isEditMode
      ? this.service.update(this.teamId!, v)
      : this.service.save(v);

    request$.subscribe({

      next: (res: Team) => {

        const successMessage = this.isEditMode
          ? 'Team Updated Successfully!'
          : 'Team Created Successfully!';

        Swal.fire({
          icon: 'success',
          title: successMessage,
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/teams']);
        });
      },

      error: (err: any) => {

        const message = err.error?.message?.toLowerCase();

        // 🔴 FIFA CODE DUPLICADO
        if (message?.includes('fifa')) {
          Swal.fire(
            'FIFA Code already exists',
            'Please choose another code',
            'error'
          );
          return;
        }

        // 🔴 PLAYERS inválidos backend
        if (message?.includes('players')) {
          Swal.fire(
            'Invalid Players',
            err.error?.message,
            'error'
          );
          return;
        }

        Swal.fire(
          'Error',
          err.error?.message || 'Unexpected error',
          'error'
        );
      }
    });
  }
}