import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getTvEnglishDescription(id: number) {
    return this.http.get(`${this.basicUrl}/tv/${id}/translations?api_key=${this.apiKey}`)
    .pipe(
      map((data: any) => data.translations)
    )
    .pipe(
      map(translations => translations.filter(transl => transl.name === 'English'))
    );
  }
}
