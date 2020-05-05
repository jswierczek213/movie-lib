import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  getTrendingToday() {
    return this.http.get(`${this.basicUrl}/trending/movie/day?api_key=${this.apiKey}&language=pl`);
  }

  getTrendingThisWeek() {
    return this.http.get(`${this.basicUrl}/trending/movie/week?api_key=${this.apiKey}&language=pl`);
  }

  getMovieById(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}?api_key=${this.apiKey}&language=pl`);
  }

  getMovieCast(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getMovieVideoInfo(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}/videos?api_key=${this.apiKey}`);
  }
}
