import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TrendingMovies } from '../interfaces/trending-movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  dailyTrendingMovies;
  weeklyTrendingMovies;

  showDailyMoviesLoader = false;
  showWeeklyMoviesLoader = false;

  ngOnInit() {
    this.showDailyMoviesLoader = true;
    this.movieService.getTrendingToday()
    .pipe(
        map((data: TrendingMovies) => data.results),
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

    this.showWeeklyMoviesLoader = true;
    this.movieService.getTrendingThisWeek()
    .pipe(
      map((data: TrendingMovies) => data.results),
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

}
