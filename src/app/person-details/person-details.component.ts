import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute
  ) { }

  personId: number;
  person: any;
  moviesList: Array<any>;
  maxListItemCount = 5;

  showLoader: boolean;
  notFound: boolean;

  ngOnInit() {
    this.showLoader = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.personId = parseInt(id, 10);

    this.loadPerson();
  }

  loadPerson() {
    this.personService.getPersonById(this.personId)
    .pipe(
      finalize(() => this.showLoader = false)
    )
    .subscribe(
      (data) => this.person = data,
      (error: HttpErrorResponse) => {
        console.error(error);
        this.notFound = true;
      },
      () => this.loadMovieList()
    );
  }

  loadMovieList() {
    this.personService.getMovieList(this.personId)
    .pipe(
      map((data: any) => data.cast)
    )
    .subscribe(
      (result) => this.moviesList = result
    );
  }

  loadEnglishBio() {
    this.personService.getEnglishBio(this.personId)
    .pipe(
      map((result: any) => result.translations.filter(item => item.name === 'English'))
    )
    .subscribe(
      (data) => {
        if (data.length > 0) {
          this.person.biography = data[0].data.biography;
        } else {
          this.person.biography = 'Brak biografii';
        }
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  showAllMovies() {
    this.maxListItemCount = this.moviesList.length;
  }

}
