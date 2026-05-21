import { Component, OnInit, signal } from '@angular/core';
import { TeamService } from '../../../services/team-service';
import { Team } from '../../../models/TeamInterface';


@Component({
  selector: 'app-team-list-component',
  standalone: false,
  templateUrl: './team-list-component.html',
  styleUrl: './team-list-component.css',
})
export class TeamListComponent implements OnInit {

  teams = signal<Team[]>([]);
constructor(private service: TeamService) { //usa injeção de dependências para
  //utilizar o formbuilder dentro do constructor


       
  
}
  ngOnInit(): void {
   this.service.getAllTeams().subscribe(
      {
        next: json => this.teams.set(json)
      }
    );

  }

   delete(team: Team) {
    this.service.delete(team).subscribe(
      {
        next: () => {
          this.teams.update(teams => teams.filter(t => t.id != team.id));
        }
      }
    )
}
}
