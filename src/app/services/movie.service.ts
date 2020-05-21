import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  getTrendingThisWeek() {
    return this.http.get(`${this.basicUrl}/trending/movie/week?api_key=${this.apiKey}&language=pl`);
  }

  getMovieById(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}?api_key=${this.apiKey}&language=pl`);
  }

  getMovieEngDescription(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}/translations?api_key=${this.apiKey}`)
    .pipe(
      map((data: any) => data.translations)
    )
    .pipe(
      map(translations => translations.filter(transl => transl.name === 'English'))
    );
  }

  getMovieCast(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getMovieVideoInfo(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}/videos?api_key=${this.apiKey}`);
  }

  getReviews(id: number) {
    return this.http.get(`${this.basicUrl}/movie/${id}/reviews?api_key=${this.apiKey}`);
  }

  getGenres() {
    return this.http.get(`${this.basicUrl}/genre/movie/list?api_key=${this.apiKey}&language=pl`);
  }

  discoverMovies(sort: string, genres: Array<number>, primaryReleaseYear: string, page: string) {
    let params = new HttpParams();
    params = params.append('api_key', this.apiKey);
    params = params.append('language', 'pl');
    params = params.append('sort_by', sort);
    params = params.append('page', page);

    if ((genres.length > 0) && (primaryReleaseYear.length > 0)) {
      params = params.append('with_genres', genres.join(','));
      params = params.append('primary_release_year', primaryReleaseYear);
    } else if (genres.length > 0) {
      params = params.append('with_genres', genres.join(','));
    } else if (primaryReleaseYear.length > 0) {
      params = params.append('primary_release_year.gte', primaryReleaseYear);
    }

    return this.http.get(`${this.basicUrl}/discover/movie`, { params });
  }
}
