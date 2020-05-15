import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  getPersonById(id: number) {
    return this.http.get(`${this.basicUrl}/person/${id}?api_key=${this.apiKey}&language=pl`);
  }

  getEnglishBio(id: number) {
    return this.http.get(`${this.basicUrl}/person/${id}/translations?api_key=${this.apiKey}`);
  }

  getMovieList(id: number) {
    return this.http.get(`${this.basicUrl}/person/${id}/movie_credits?api_key=${this.apiKey}&language=pl`);
  }

  getTvList(id: number) {
    return this.http.get(`${this.basicUrl}/person/${id}/tv_credits?api_key=${this.apiKey}&language=pl`);
  }

  getPopular() {
    return this.http.get(`${this.basicUrl}/person/popular?api_key=${this.apiKey}&language=pl`);
  }
}
