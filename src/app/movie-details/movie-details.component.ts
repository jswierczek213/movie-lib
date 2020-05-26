import { Component, OnInit, ViewEncapsulation, DoCheck, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailsComponent implements OnInit, DoCheck, OnDestroy {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private movieService: MovieService) { }

  posterBasicUrl = 'http://image.tmdb.org/t/p/w300';
  profileImageBasicUrl = 'http://image.tmdb.org/t/p/w185';

  subscriptions$: any[] = [];

  movieId: number;
  movie: any;

  movieCast: Array<any> = [];

  movieVideos: Array<any> = [];

  englishDescription: string;

  reviewsList: Array<any>;

  maxMoviesCount = 3;

  showMainLoader = false;
  showCastLoader = false;
  showVideoLoader = false;
  showDescriptionLoader = false;
  allLoaded = false;
  notFound = false;
  showCastButton = true;
  showMoviesButton = true;
  displayReviews = false;

  ngOnInit() {
    this.showMainLoader = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.movieId = parseInt(id, 10);

    // Get movie from API
    this.loadMovieData();

    // Get reviews from API
    this.loadReviews();
  }

  ngDoCheck() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.posterBasicUrl = 'http://image.tmdb.org/t/p/w185';
    } else {
      this.posterBasicUrl = 'http://image.tmdb.org/t/p/w300';
    }
  }

  loadMovieData() {
    this.subscriptions$.push(this.movieService.getMovieById(this.movieId).pipe(
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
    ));
  }

  loadCast() {
    this.showCastLoader = true;
    this.showCastButton = false;

    this.subscriptions$.push(this.movieService.getMovieCast(this.movieId)
    .pipe(
      map((data: any) => data.cast),
      finalize(() => {
        this.showCastLoader = false;
      })
    )
    .subscribe(
      (cast) => this.movieCast = cast,
      (error: HttpErrorResponse) => {
        console.error(error);
      },
      () => {
        this.allLoaded = true;
      }
    ));
  }

  loadMovies() {
    this.showVideoLoader = true;
    this.showMoviesButton = false;

    this.subscriptions$.push(this.movieService.getMovieVideoInfo(this.movieId)
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
    ));
  }

  loadMoreVideos() {
    this.maxMoviesCount = this.movieVideos.length;
  }

  loadEnglishDescription() {
    this.showDescriptionLoader = true;

    this.subscriptions$.push(this.movieService.getMovieEngDescription(this.movieId)
    .pipe(
      map((result: any) => result[0].data.overview),
      finalize(() => {
        this.showDescriptionLoader = false;
      })
    )
    .subscribe(
      (result) => {
        this.englishDescription = result;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      },
      () => {
        this.movie.overview = this.englishDescription;
      }
    ));
  }

  loadReviews() {
    this.subscriptions$.push(this.movieService.getReviews(this.movieId)
    .pipe(
      map((data: any) => data.results)
    )
    .subscribe(
      (results) => this.reviewsList = results,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  showReviews() {
    this.displayReviews = true;
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
