import { Component, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentService } from '../../../services/tournament-service';
import { Tournament } from '../../../models/TournamentInterface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import { TeamService } from '../../../services/team-service';
import { Team } from '../../../models/TeamInterface';


@Component({
  selector: 'app-tournament-form-component',
  standalone: false,
  templateUrl: './tournament-form-component.html',
  styleUrl: './tournament-form-component.css',
})
export class TournamentFormComponent implements OnInit {

  isEditMode = false;
  tournamentId?: number;

  Tournaments = signal<Tournament[]>([]);
  Teams = signal<Team[]>([]);


  formGroupTournaments: FormGroup; // criando um formGroup
  
  constructor(private formBuilder: FormBuilder, 
    private service: TournamentService, 
     private route: ActivatedRoute,
    private router: Router,
    private TeamService: TeamService
  ) { //usa injeção de dependências para
  //utilizar o formbuilder dentro do constructor

  this.formGroupTournaments = formBuilder.group({ 
    id: [''],
    team1Id: [
        '',
        [
          Validators.required,
        ]
      ],

    team2Id: [
        '',
        [
          Validators.required,
        ]
      ],
    location: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required]
    });

  }
   ngOnInit(): void {

    this.TeamService.getAllTeams().subscribe({
  next: (teams) => {
    this.Teams.set(teams);
  },
  error: (err) => {
    console.error('Erro ao carregar times:', err);
  }
});

     const idParam = this.route.snapshot.paramMap.get('id');
 
     if (idParam) {
 
       this.tournamentId = Number(idParam);
       this.isEditMode = true;
 
       this.service.getById(this.tournamentId).subscribe({
         next: (tournament: Tournament) => {
           this.formGroupTournaments.patchValue(tournament);
         },
         error: (err) => {
           console.error('Erro ao buscar time:', err);
         }
       });
 
     }
   }
  save(): void {

    const { team1Id, team2Id } = this.formGroupTournaments.value;

if (team1Id === team2Id) {
  Swal.fire({
    icon: 'error',
    title: 'Invalid Match',
    text: 'A team cannot play against itself.'
  });
  return;
}


    if (this.isEditMode) {
this.service.update(this.tournamentId!, this.formGroupTournaments.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Tournament Updated Succesfully!',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/tournaments']);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
        }
      });

    } else {

      this.service.save(this.formGroupTournaments.value).subscribe({
        next: (json: Tournament) => {
          this.Tournaments.update(t => [...t, json]);
          this.formGroupTournaments.reset();
          Swal.fire({
            icon: 'success',
            title: 'Tournament Created Succesfully!',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/tournaments']);
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
