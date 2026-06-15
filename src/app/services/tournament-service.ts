import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../models/TournamentInterface';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
    apiUrl = "http://localhost:8080/tournaments";


  constructor(private http: HttpClient) { }

  getAllTournaments(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(this.apiUrl);
  }
    delete(tournament: Tournament): Observable<void> { // DELETE (DELETE/excluir)
    return this.http.delete<void>(`${this.apiUrl}/${tournament.id}`);
  }

  
      getById(id: number): Observable<Tournament> {
      return this.http.get<Tournament>(`${this.apiUrl}/${id}`);
    }
  
save(data: any) {
  return this.http.post<any>('http://localhost:8080/tournaments', data);
}

update(id: number, data: any) {
  return this.http.put<any>(`http://localhost:8080/tournaments/${id}`, data);
}
}
