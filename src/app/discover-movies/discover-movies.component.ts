import { MovieService } from './../services/movie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.scss']
})
export class DiscoverMoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private fb: FormBuilder) { }

  @ViewChild('content', {static: false}) content: ElementRef;

  discoverForm: FormGroup;

  availableYears: Array<number> = [];
  genresList: Array<any>;
  moviesList: Array<any> = [];

  totalPageCount: number;
  pageNumber: number;

  visibleLoader = false;

  ngOnInit() {
    this.pageNumber = 1;

    this.loadAvailableYears();

    this.getGenresList();

    this.discoverForm = this.fb.group({
      primaryYear: [''],
      sortMethod: ['popularity.desc'],
      genres: this.fb.array([])
    });
  }

  getGenresList() {
    this.movieService.getGenres()
    .pipe(
      map((data: any) => data.genres)
    )
    .subscribe(
      (results) => this.genresList = results,
      (error: HttpErrorResponse) => console.error(error),
      () => this.discover()
    );
  }

  loadAvailableYears() {
    const currentYear = new Date().getFullYear();

    for (let i = 1833; i <= currentYear; i++) {
      this.availableYears.push(i);
    }
  }

  loadOverview(id: number, i: number) {
    this.movieService.getMovieEngDescription(id)
    .pipe(
      map((data: any) => data[0].data.overview)
    )
    .subscribe(overview => this.moviesList[i].overview = overview);
  }

  onCheckboxChange(e) {
    const genres: FormArray = this.discoverForm.get('genres') as FormArray;

    if (e.checked) {
      genres.push(new FormControl(e.source.value));
    } else {
      let i = 0;
      genres.controls.forEach((item: FormControl) => {
        if (item.value === e.source.value) {
          genres.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  discover() {
    this.visibleLoader = true;

    const sort = this.discoverForm.value.sortMethod;
    const genres = this.discoverForm.value.genres;
    const primaryYear = this.discoverForm.value.primaryYear;

    this.movieService.discoverMovies(sort, genres, primaryYear, this.pageNumber.toString())
    .pipe(
      finalize(() => this.visibleLoader = false)
    )
    .subscribe(
      (data: any) => {
        this.moviesList = data.results;
        this.totalPageCount = data.total_pages;
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  resetPageNumber() {
    this.pageNumber = 1;
  }

  prev() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.discover();

      const verticalOffset = this.content.nativeElement.offsetTop;
      window.scroll(0, verticalOffset);
    } else {
      return;
    }
  }

  next() {
    if (this.totalPageCount > this.pageNumber) {
      this.pageNumber++;
      this.discover();

      const verticalOffset = this.content.nativeElement.offsetTop;
      window.scroll(0, verticalOffset);
    } else {
      return;
    }
  }

  submit() {
    this.resetPageNumber();
    this.discover();
  }

}
