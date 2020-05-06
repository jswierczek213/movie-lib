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

  weeklyTrendingMovies;

  showWeeklyMoviesLoader = false;

  maxWeeklyMovies = 3;

  ngOnInit() {
    this.showWeeklyMoviesLoader = true;
    this.getTrendingThisWeek();
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

  showMoreWeeklyMovies() {
    if (this.maxWeeklyMovies === 3) {
      this.maxWeeklyMovies = 12;
    } else {
      this.maxWeeklyMovies = 20;
    }
  }

}
