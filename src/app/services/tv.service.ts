import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) { }

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  getTrendingThisWeek() {
    return this.http.get(`${this.basicUrl}/trending/tv/week?api_key=${this.apiKey}&language=pl`);
  }

  getTvById(id: number) {
    return this.http.get(`${this.basicUrl}/tv/${id}?api_key=${this.apiKey}&language=pl`);
  }
}
