import { Component, OnInit, signal } from '@angular/core';
import { TournamentService } from '../../../services/tournament-service';
import { Tournament } from '../../../models/TournamentInterface';
import Swal from 'sweetalert2';

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



