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

  movieId: number;
  movie: any;
  movie$: Subscription;

  movieCast: Array<any> = [];
  movieCast$: Subscription;

  movieVideos: Array<any> = [];
  movieVideos$: Subscription;

  englishDescription: string;
  englishDescription$: Subscription;

  reviewsList: Array<any>;
  reviewsList$: Subscription;

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
    this.movie$ = this.movieService.getMovieById(this.movieId).pipe(
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

  loadCast() {
    this.showCastLoader = true;
    this.showCastButton = false;

    this.movieCast$ = this.movieService.getMovieCast(this.movieId)
    .pipe(
      map((data: any) => data.cast),
      finalize(() => {
        this.showCastLoader = false;
      })
    )
    .subscribe(
      (cast) => {
        this.movieCast = cast;
        console.log(cast);
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

    this.movieVideos$ = this.movieService.getMovieVideoInfo(this.movieId)
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

  loadEnglishDescription() {
    this.showDescriptionLoader = true;

    this.englishDescription$ = this.movieService.getMovieEngDescription(this.movieId)
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
    );
  }

  loadReviews() {
    this.reviewsList$ = this.movieService.getReviews(this.movieId)
    .pipe(
      map((data: any) => data.results)
    )
    .subscribe(
      (results) => this.reviewsList = results,
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  showReviews() {
    this.displayReviews = true;
  }

  ngOnDestroy() {
    this.movie$.unsubscribe();

    if (this.movieCast$) {
      this.movieCast$.unsubscribe();
    }

    if (this.movieVideos$) {
      this.movieVideos$.unsubscribe();
    }

    if (this.reviewsList$) {
      this.reviewsList$.unsubscribe();
    }
  }

}
