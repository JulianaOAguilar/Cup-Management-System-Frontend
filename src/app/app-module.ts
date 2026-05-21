import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/shared/header-component/header-component';
import { FooterComponent } from './components/shared/footer-component/footer-component';
import { TeamFormComponent } from './components/team/team-form-component/team-form-component';
import { TeamListComponent } from './components/team/team-list-component/team-list-component';
import { TournamentFormComponent } from './components/tournament/tournament-form-component/tournament-form-component';
import { TournamentListComponent } from './components/tournament/tournament-list-component/tournament-list-component';
import { HomeComponent } from './components/home-component/home-component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    FooterComponent,
    TeamFormComponent,
    TeamListComponent,
    TournamentFormComponent,
    TournamentListComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
