import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TvService } from '../services/tv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-and-tv',
  templateUrl: './movies-and-tv.component.html',
  styleUrls: ['./movies-and-tv.component.scss']
})
export class MoviesAndTvComponent implements OnInit, OnDestroy {

  constructor(private movieService: MovieService, private tvService: TvService) { }

  subscriptions$: any[] = [];

  weeklyTrendingMovies: Array<any>;
  weeklyTrendingTv: Array<any>;

  showWeeklyMoviesLoader = false;
  showWeeklyTvLoader = false;

  maxWeeklyMovies = 3;
  maxWeeklyTv = 3;

  ngOnInit() {
    this.showWeeklyMoviesLoader = true;
    this.showWeeklyTvLoader = true;

    this.getWeeklyTrendingMovies();
    this.getWeeklyTrendingTv();
  }

  getWeeklyTrendingMovies() {
    this.subscriptions$.push(this.movieService.getTrendingThisWeek()
    .pipe(
      map((data: any) => data.results),
      finalize(() => {
        this.showWeeklyMoviesLoader = false;
      })
    )
    .subscribe(
      (result) => this.weeklyTrendingMovies = result,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  getWeeklyTrendingTv() {
    this.subscriptions$.push(this.tvService.getTrendingThisWeek()
    .pipe(
      map((data: any) => data.results),
      finalize(() => {
        this.showWeeklyTvLoader = false;
      })
    )
    .subscribe(
      (data) => this.weeklyTrendingTv = data,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  showMoreWeeklyMovies() {
    if (this.maxWeeklyMovies === 3) {
      this.maxWeeklyMovies = 12;
    } else {
      this.maxWeeklyMovies = 20;
    }
  }

  showMoreWeeklyTv() {
    if (this.maxWeeklyTv === 3) {
      this.maxWeeklyTv = 12;
    } else {
      this.maxWeeklyTv = 20;
    }
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
