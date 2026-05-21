import { Component, OnInit, signal } from '@angular/core';
import { TournamentService } from '../../../services/tournament-service';
import { Tournament } from '../../../models/TournamentInterface';

@Component({
  selector: 'app-tournament-list-component',
  standalone: false,
  templateUrl: './tournament-list-component.html',
  styleUrl: './tournament-list-component.css',
})
export class TournamentListComponent implements OnInit {

    tournament = signal<Tournament[]>([]);
  constructor(private service: TournamentService) { //usa injeção de dependências para
    //utilizar o formbuilder dentro do constructor
  }


  ngOnInit(): void {
    this.service.getAllTournaments().subscribe(
      {
        next: json => this.tournament.set(json)
      }
    );
  }

     delete(tournaments: Tournament) {
      this.service.delete(tournaments).subscribe(
        {
          next: () => {
            this.tournament.update(tournament => tournament.filter(t => t.id != tournaments.id));
          }
        }
      )
  }


}



