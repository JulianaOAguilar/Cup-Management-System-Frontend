import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../models/TournamentInterface';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
    apiUrl = "http://localhost:3000/tournaments";


  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(this.apiUrl);
  }

    save(tournament: Tournament): Observable<Tournament> { // POST (CREATE/criar)
    return this.http.post<Tournament>(this.apiUrl, tournament);
  }
}
