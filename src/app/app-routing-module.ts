import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { TeamFormComponent } from './components/team/team-form-component/team-form-component';
import { TeamListComponent } from './components/team/team-list-component/team-list-component';
import { TournamentFormComponent } from './components/tournament/tournament-form-component/tournament-form-component';
import { TournamentListComponent } from './components/tournament/tournament-list-component/tournament-list-component';



const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'teams', component: TeamListComponent },
  { path: 'teams/new', component: TeamFormComponent },
  { path: 'teams/edit/:id', component: TeamFormComponent },


  { path: 'tournaments', component: TournamentListComponent },
  { path: 'tournaments/new', component: TournamentFormComponent },
  { path: 'tournaments/edit/:id', component: TournamentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
