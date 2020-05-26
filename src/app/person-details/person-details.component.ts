import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute
  ) { }

  subscriptions$: any[] = [];

  personId: number;
  person: any;
  moviesList: Array<any>;
  tvList: Array<any>;
  maxMovieItemCount = 5;
  maxTvItemCount = 5;

  showLoader: boolean;
  notFound: boolean;

  ngOnInit() {
    this.showLoader = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.personId = parseInt(id, 10);

    this.loadPerson();
  }

  loadPerson() {
    this.subscriptions$.push(this.personService.getPersonById(this.personId)
    .pipe(
      finalize(() => this.showLoader = false)
    )
    .subscribe(
      (data) => this.person = data,
      (error: HttpErrorResponse) => {
        console.error(error);
        this.notFound = true;
      },
      () => {
        this.loadMovieList();
        this.loadTvList();
      }
    ));
  }

  loadMovieList() {
    this.subscriptions$.push(this.personService.getMovieList(this.personId)
    .pipe(
      map((data: any) => data.cast)
    )
    .subscribe(
      (result) => this.moviesList = result,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  loadTvList() {
    this.subscriptions$.push(this.personService.getTvList(this.personId)
    .pipe(
      map((data: any) => data.cast)
    )
    .subscribe(
      (result) => this.tvList = result,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  loadEnglishBio() {
    this.subscriptions$.push(this.personService.getEnglishBio(this.personId)
    .pipe(
      map((data: any) => (data.length > 0) && (data[0].data.biography.length > 0) ? data[0].data.biography : 'Brak')
    )
    .subscribe(
      (biography) => this.person.biography = biography,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  showAllMovies() {
    this.maxMovieItemCount = this.moviesList.length;
  }

  showAllTv() {
    this.maxTvItemCount = this.tvList.length;
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
