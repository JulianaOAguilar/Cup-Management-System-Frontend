import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/TeamInterface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  getAll() {
    throw new Error('Method not implemented.');
  }
  apiUrl = "http://localhost:3000/teams";


  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.apiUrl);
  }

   update(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team);
  }

    getById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

    save(team: Team): Observable<Team> { // POST (CREATE/criar)
    return this.http.post<Team>(this.apiUrl, team);
  }
    delete(team: Team): Observable<void> { // DELETE (DELETE/excluir)
    return this.http.delete<void>(`${this.apiUrl}/${team.id}`);
  }
  
  edit(team: Team): Observable<Team>{ // PUT (UPDATE/editar)
  // put manda todo o objeto, patch manda apenas o que for alterado
    return this.http.put<Team>(`${this.apiUrl}/${team.id}`, team);
}
  
}
