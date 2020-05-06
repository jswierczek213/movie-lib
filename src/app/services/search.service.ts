import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  getSearchResults(query: string) {
    const safeQuery = encodeURI(query);
    return this.http.get(
      `${this.basicUrl}/search/multi?api_key=${this.apiKey}&language=pl&query=${safeQuery}&page=1&include_adult=true`
    );
  }
}
