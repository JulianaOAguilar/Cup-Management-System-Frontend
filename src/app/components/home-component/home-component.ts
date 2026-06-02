import { Component, OnInit, signal } from '@angular/core';
import { Tournament } from '../../models/TournamentInterface';
import { Team } from '../../models/TeamInterface';
import { TeamService } from '../../services/team-service';
import { TournamentService } from '../../services/tournament-service';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  // Signals
  Tournaments = signal<Tournament[]>([]);
  Teams = signal<Team[]>([]);

  // Próximo jogo
  nextTournament?: Tournament;

  getTeamName(id: number | string): string {
  return this.Teams().find(t => t.id === Number(id))?.country ?? '';
}


  constructor(
    private teamService: TeamService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {

    // 🔹 Carrega times
    this.teamService.getAllTeams().subscribe({
      next: (data) => {
        this.Teams.set(data);
      },
      error: (err) => {
        console.error('Erro ao carregar teams:', err);
      }
    });

    // 🔹 Carrega torneios + calcula próximo jogo
    this.tournamentService.getAllTournaments().subscribe({
      next: (data) => {

        this.Tournaments.set(data);

        const now = new Date();

        const futureTournaments = data
          .filter(t => new Date(t.date + 'T00:00:00') >= now)
          .sort((a, b) =>
            new Date(a.date + 'T00:00:00').getTime() -
            new Date(b.date + 'T00:00:00').getTime()
          );

        this.nextTournament = futureTournaments[0] ?? null;

      },
      error: (err) => {
        console.error('Erro ao carregar tournaments:', err);
      }
    });

  }

}