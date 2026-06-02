import { Component, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';

import { TournamentService } from '../../../services/tournament-service';
import { TeamService } from '../../../services/team-service';

import { Tournament } from '../../../models/TournamentInterface';
import { Team } from '../../../models/TeamInterface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tournament-list-component',
  standalone: false,
  templateUrl: './tournament-list-component.html',
  styleUrl: './tournament-list-component.css',
})
export class TournamentListComponent implements OnInit {

  tournament = signal<Tournament[]>([]);
  Teams = signal<Team[]>([]);

  constructor(
    private service: TournamentService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {

    forkJoin({
      tournaments: this.service.getAllTournaments(),
      teams: this.teamService.getAllTeams()
    }).subscribe({
      next: ({ tournaments, teams }) => {

        this.tournament.set(tournaments);
        this.Teams.set(teams);

      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
      }
    });

  }

  getTeamName = (id: number | string): string =>
    this.Teams().find(t => t.id === Number(id))?.country ?? '';

  delete(tournament: Tournament) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {

        this.service.delete(tournament).subscribe({

          next: () => {

            this.tournament.update(list =>
              list.filter(t => t.id !== tournament.id)
            );

            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Tournament has been removed.'
            });

          },

          error: () => {

            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Could not delete tournament.'
            });

          }

        });

      }

    });

  }

}