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
}
