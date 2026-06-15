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

  Tournaments = signal<Tournament[]>([]);
  Teams = signal<Team[]>([]);

  nextTournament: Tournament | null = null;

  constructor(
    private teamService: TeamService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {

    // 🔹 Teams
    this.teamService.getAllTeams().subscribe({
      next: (data) => this.Teams.set(data),
      error: (err) => console.error('Erro ao carregar teams:', err)
    });

    // 🔹 Tournaments
    this.tournamentService.getAllTournaments().subscribe({
      next: (data) => {

        this.Tournaments.set(data);

        const now = new Date();

        const futureTournaments = data
          .filter(t =>
            new Date(t.matchDateTime) >= now
          )
          .sort((a, b) =>
            new Date(a.matchDateTime).getTime() -
            new Date(b.matchDateTime).getTime()
          );

        this.nextTournament = futureTournaments[0] ?? null;
      },
      error: (err) => console.error('Erro ao carregar tournaments:', err)
    });

  }

  getTeamName(id: number | string): string {
    return this.Teams().find(t => t.id === Number(id))?.country ?? '';
  }
}