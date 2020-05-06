import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailsComponent implements OnInit, DoCheck {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private movieService: MovieService) { }

  posterBasicUrl = 'http://image.tmdb.org/t/p/w300';
  profileImageBasicUrl = 'http://image.tmdb.org/t/p/w185';
  movie;
  movieCast: Array<any> = [];
  movieVideos: Array<any> = [];
  movieId: number;
  maxMoviesCount = 3;

  showMainLoader = false;
  showCastLoader = false;
  showVideoLoader = false;
  allLoaded = false;
  notFound = false;
  showCastButton = true;
  showMoviesButton = true;

  ngOnInit() {
    this.showMainLoader = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.movieId = parseInt(id, 10);

    this.movieService.getMovieById(this.movieId).pipe(
      finalize(() => {
        this.showMainLoader = false;
      })
    ).subscribe(
      (result) => {
        this.movie = result;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.notFound = true;
      },
      () => {
        this.allLoaded = true;
      }
    );
  }

  ngDoCheck() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.posterBasicUrl = 'http://image.tmdb.org/t/p/w185';
      // this.profileImageBasicUrl = 'http://image.tmdb.org/t/p/w45';
    } else {
      this.posterBasicUrl = 'http://image.tmdb.org/t/p/w300';
      // this.profileImageBasicUrl = 'http://image.tmdb.org/t/p/w185';
    }
  }

  loadCast() {
    this.showCastLoader = true;
    this.showCastButton = false;

    this.movieService.getMovieCast(this.movieId)
    .pipe(
      map((data: any) => data.cast),
      finalize(() => {
        this.showCastLoader = false;
      })
    )
    .subscribe(
      (cast) => {
        this.movieCast = cast;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      },
      () => {
        this.allLoaded = true;
      }
    );
  }

  loadMovies() {
    this.showVideoLoader = true;
    this.showMoviesButton = false;

    this.movieService.getMovieVideoInfo(this.movieId)
    .pipe(
      map((data: any) => data.results),
      finalize(() => {
        this.showVideoLoader = false;
      })
    )
    .subscribe(
      (results) => {
        this.movieVideos = results;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  loadMoreVideos() {
    this.maxMoviesCount = this.movieVideos.length;
  }

}
