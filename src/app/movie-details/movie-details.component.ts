import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { MovieCredits } from '../interfaces/movie-credits';

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
  movieCast: Array<any>;

  showLoader = false;
  allLoaded = false;
  notFound = false;

  ngOnInit() {
    this.showLoader = true;
    const id = this.route.snapshot.paramMap.get('id');

    this.movieService.getMovieById(parseInt(id, 10)).pipe(
      finalize(() => {
        this.showLoader = false;
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
        // Get movie cast
        this.movieService.getMovieCast(parseInt(id, 10))
        .pipe(
          map((data: MovieCredits) => data.cast)
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
    );
  }

  ngDoCheck() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.posterBasicUrl = 'http://image.tmdb.org/t/p/w185';
      this.profileImageBasicUrl = 'http://image.tmdb.org/t/p/w45';
    } else {
      this.posterBasicUrl = 'http://image.tmdb.org/t/p/w300';
      this.profileImageBasicUrl = 'http://image.tmdb.org/t/p/w185';
    }
  }

}
