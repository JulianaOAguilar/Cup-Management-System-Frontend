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

  getAllTournaments(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(this.apiUrl);
  }
    delete(tournament: Tournament): Observable<void> { // DELETE (DELETE/excluir)
    return this.http.delete<void>(`${this.apiUrl}/${tournament.id}`);
  }

     update(id: number, tournament: Tournament): Observable<Tournament> {
      return this.http.put<Tournament>(`${this.apiUrl}/${id}`, tournament);
    }
  
      getById(id: number): Observable<Tournament> {
      return this.http.get<Tournament>(`${this.apiUrl}/${id}`);
    }
  

    save(tournament: Tournament): Observable<Tournament> { // POST (CREATE/criar)
    return this.http.post<Tournament>(this.apiUrl, tournament);
  }
}
