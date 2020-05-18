import { MovieService } from './../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.scss']
})
export class DiscoverMoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  genresList: Array<any>;

  ngOnInit() {
    this.getGenresList();
  }

  getGenresList() {
    this.movieService.getGenres()
    .pipe(
      map((data: any) => data.genres)
    )
    .subscribe(
      (results) => this.genresList = results,
      (error: HttpErrorResponse) => console.error(error)
    );
  }

}
