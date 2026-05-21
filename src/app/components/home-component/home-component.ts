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
export class HomeComponent implements OnInit
 {

  Tournaments = signal<Tournament[]>([]);
  Teams = signal<Team[]>([]);

  constructor(
  private teamService: TeamService,
  private tournamentService: TournamentService
) {}


  ngOnInit(): void {
     this.teamService.getAllTeams().subscribe(data => {
    this.Teams.set(data);
  });

  this.tournamentService.getAllTournaments().subscribe(data => {
    this.Tournaments.set(data);
  });
  }


  


}
  

