import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Hero } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }

  getSuggestions(term: string): Observable<Hero[]> {
    const params = new HttpParams().set('q', term).set('_limit', '6');
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`, { params });
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
     return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }

  deleteHero(id: string): Observable<any> {
     return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  }
}
