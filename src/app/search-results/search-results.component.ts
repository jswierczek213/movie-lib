import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  subscriptions$: any[] = [];

  results: Array<any>;
  maxMoviesCount: number;
  maxTvCount: number;
  maxPersonsCount: number;

  movies: Array<any>;
  tv: Array<any>;
  persons: Array<any>;

  showLoader = false;

  ngOnInit() {
    this.showLoader = true;
    this.subscriptions$.push(this.route.params.subscribe(data => this.loadResults(data.query)));
  }

  loadResults(query) {
    this.maxMoviesCount = 2;
    this.maxTvCount = 2;
    this.maxPersonsCount = 2;

    this.subscriptions$.push(this.searchService.getSearchResults(query)
    .pipe(
      map((data: any) => data.results),
      finalize(() => this.showLoader = false)
    )
    .subscribe(
      (results) => this.results = results,
      (error: HttpErrorResponse) => console.error(error),
      () => this.separateArrays()
    ));
  }

  separateArrays() {
    this.movies = this.results.filter((data) => data.media_type === 'movie');

    this.tv = this.results.filter((data) => data.media_type === 'tv');

    this.persons = this.results.filter((data) => data.media_type === 'person');
  }

  showAllMovies() {
    this.maxMoviesCount = this.movies.length;
  }

  showAllTv() {
    this.maxTvCount = this.tv.length;
  }

  showAllPersons() {
    this.maxPersonsCount = this.persons.length;
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
