import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeamService } from '../../../services/team-service';
import { Team } from '../../../models/TeamInterface';
import { Tournament } from '../../../models/TournamentInterface';

@Component({
  selector: 'app-tournament-form-component',
  templateUrl: './tournament-form-component.html',
  styleUrl: './tournament-form-component.css',
  standalone: false,

})
export class TournamentFormComponent implements OnInit {

  isEditMode = false;
  tournamentId?: number;

  Teams = signal<Team[]>([]);

  formGroupTournaments!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {

   this.formGroupTournaments = this.fb.group({
  team1Id: ['', Validators.required],
  team2Id: ['', Validators.required],
  location: ['', Validators.required],

  matchDate: ['', Validators.required],
  matchTime: ['', Validators.required],
});
  }

  ngOnInit(): void {

    this.teamService.getAllTeams().subscribe({
      next: (teams: Team[]) => this.Teams.set(teams),
      error: (err: any) => console.error(err)
    });

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.tournamentId = Number(idParam);

      this.service.getById(this.tournamentId).subscribe({
        next: (t: any) => {

this.formGroupTournaments.patchValue({
  team1Id: t.team1Id,
  team2Id: t.team2Id,
  location: t.location,

  matchDate: t.matchDateTime?.split('T')[0],
  matchTime: t.matchDateTime?.split('T')[1]?.substring(0, 5)
});

        },
        error: (err: any) => console.error(err)
      });
    }
  }

  save(): void {

    const v = this.formGroupTournaments.value;

if (v.team1Id === v.team2Id) {
  Swal.fire('Error', 'A team cannot play against itself.', 'error');
  return;
}

const matchDateTime = `${v.matchDate}T${v.matchTime}:00`;

const payload = {
  team1Id: Number(v.team1Id),
  team2Id: Number(v.team2Id),
  location: v.location,
  matchDateTime
};

    if (this.isEditMode) {

      this.service.update(this.tournamentId!, payload).subscribe({
        next: () => {
          Swal.fire('Success', 'Updated!', 'success');
          this.router.navigate(['/tournaments']);
        },
        error: (err: any) => console.error(err)
      });

    } else {

      this.service.save(payload).subscribe({
        next: () => {
          Swal.fire('Success', 'Created!', 'success');
          this.router.navigate(['/tournaments']);
        },
        error: (err: any) => console.error(err)
      });

    }
  }
}