import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) {}

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  tvData = new ReplaySubject();

  sendNewTvData(data: any) {
    this.tvData.next(data);
  }

  getTvData() {
    return this.tvData.asObservable();
  }

  getTrendingThisWeek() {
    return this.http.get(`${this.basicUrl}/trending/tv/week?api_key=${this.apiKey}&language=pl`);
  }

  getTvById(id: number) {
    return this.http.get(`${this.basicUrl}/tv/${id}?api_key=${this.apiKey}&language=pl`);
  }

  getGenres() {
    return this.http.get(`${this.basicUrl}/genre/tv/list?api_key=${this.apiKey}&language=pl`);
  }

  getTvEnglishDescription(id: number) {
    return this.http.get(`${this.basicUrl}/tv/${id}/translations?api_key=${this.apiKey}`)
    .pipe(
      map((data: any) => data.translations)
    )
    .pipe(
      map(translations => translations.filter(transl => transl.name === 'English'))
    );
  }

  discoverTv(sort: string, genres: Array<number>, primaryReleaseYear: string, page: string) {
    let params = new HttpParams();
    params = params.append('api_key', this.apiKey);
    params = params.append('language', 'pl');
    params = params.append('sort_by', sort);
    params = params.append('page', page);

    if ((genres.length > 0) && (primaryReleaseYear.length > 0)) {
      primaryReleaseYear = primaryReleaseYear + '-01-01';

      params = params.append('with_genres', genres.join(','));
      params = params.append('first_air_date.gte', primaryReleaseYear);
    } else if (genres.length > 0) {
      params = params.append('with_genres', genres.join(','));
    } else if (primaryReleaseYear.length > 0) {
      primaryReleaseYear = primaryReleaseYear + '-01-01';

      params = params.append('first_air_date.gte', primaryReleaseYear);
    }

    return this.http.get(`${this.basicUrl}/discover/tv`, { params });
  }
}
