import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TournamentService } from '../../../services/tournament-service';
import { Tournament } from '../../../models/TournamentInterface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';


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
  formGroupTournaments: FormGroup; // criando um formGroup
  
  constructor(private formBuilder: FormBuilder, 
    private service: TournamentService,
     private route: ActivatedRoute,
    private router: Router) { //usa injeção de dependências para
  //utilizar o formbuilder dentro do constructor

  this.formGroupTournaments = formBuilder.group({ 
    id: [''],
    fifaCode1: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]{3}$') // exatamente 3 letras
        ]
      ],

    fifaCode2: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]{3}$') // exatamente 3 letras
        ]
      ],
    location: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required]
    });

  }
   ngOnInit(): void {
 
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
