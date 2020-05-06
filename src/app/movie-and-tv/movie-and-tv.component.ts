import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies-and-tv',
  templateUrl: './movie-and-tv.component.html',
  styleUrls: ['./movie-and-tv.component.scss']
})
export class MoviesAndTvComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  dailyTrendingMovies;
  weeklyTrendingMovies;

  showDailyMoviesLoader = false;
  showWeeklyMoviesLoader = false;

  maxDailyMovies = 3;
  maxWeeklyMovies = 3;

  ngOnInit() {
    this.showDailyMoviesLoader = true;
    this.getTrendingToday();

    this.showWeeklyMoviesLoader = true;
    this.getTrendingThisWeek();
  }

  getTrendingToday() {
    this.movieService.getTrendingToday()
    .pipe(
        map((data: any) => data.results),
        finalize(() => {
          this.showDailyMoviesLoader = false;
        })
      )
    .subscribe(
        (result) => {
          this.dailyTrendingMovies = result;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
    );
  }

  getTrendingThisWeek() {
    this.movieService.getTrendingThisWeek()
    .pipe(
      map((data: any) => data.results),
      finalize(() => {
        this.showWeeklyMoviesLoader = false;
      })
    )
    .subscribe(
      (result) => {
        this.weeklyTrendingMovies = result;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  showMoreDailyMovies() {
    if (this.maxDailyMovies === 3) {
      this.maxDailyMovies = 12;
    } else {
      this.maxDailyMovies = 20;
    }
  }

  showMoreWeeklyMovies() {
    if (this.maxWeeklyMovies === 3) {
      this.maxWeeklyMovies = 12;
    } else {
      this.maxWeeklyMovies = 20;
    }
  }

}
