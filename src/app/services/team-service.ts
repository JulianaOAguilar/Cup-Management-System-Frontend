import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/TeamInterface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  apiUrl = "http://localhost:3000/teams";


  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.apiUrl);
  }

    save(team: Team): Observable<Team> { // POST (CREATE/criar)
    return this.http.post<Team>(this.apiUrl, team);
  }

  
}
