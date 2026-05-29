import { Component, OnInit, signal } from '@angular/core';
import { TeamService } from '../../../services/team-service';
import { Team } from '../../../models/TeamInterface';
import Swal from 'sweetalert2';


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

  Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#FCD400;',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      this.service.delete(team).subscribe({

        next: () => {

          this.teams.update(list =>
            list.filter(t => t.id !== team.id)
          );

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Team has been removed.'
          });

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Could not delete team.'
          });

        }

      });

    }

  });

}

}
