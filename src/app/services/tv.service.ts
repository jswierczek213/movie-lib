import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) {
    this.tvData = this.tvDataSubject.asObservable();
  }

  apiKey = environment.apiKey;
  basicUrl = 'https://api.themoviedb.org/3';

  tvData: Observable<any>;
  private tvDataSubject = new Subject<any>();

  sendNewTvData(data: any) {
    this.tvDataSubject.next(data);
  }

  getTrendingThisWeek() {
    return this.http.get(`${this.basicUrl}/trending/tv/week?api_key=${this.apiKey}&language=pl`);
  }

  getTvById(id: number) {
    return this.http.get(`${this.basicUrl}/tv/${id}?api_key=${this.apiKey}&language=pl`);
  }
}
