import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  constructor(private personService: PersonService) { }

  popularPersons: Array<any>;
  maxPopularCount = 3;

  showPopularLoader = false;

  ngOnInit() {
    this.getPopularPersons();
  }

  getPopularPersons() {
    this.showPopularLoader = true;

    this.personService.getPopular()
    .pipe(
      map((data: any) => data.results),
      finalize(() => this.showPopularLoader = false)
    )
    .subscribe(
      (results) => this.popularPersons = results,
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  showMorePopular() {
    if (this.maxPopularCount === 3) {
      this.maxPopularCount = 10;
    } else if (this.maxPopularCount === 10) {
      this.maxPopularCount = this.popularPersons.length;
    }
  }

}
