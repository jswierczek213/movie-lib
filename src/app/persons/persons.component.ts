import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../services/person.service';
import { map, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

  constructor(private personService: PersonService) { }

  subscriptions$: any[] = [];

  popularPersons: Array<any>;
  maxPopularCount = 3;

  showPopularLoader = false;

  ngOnInit() {
    this.getPopularPersons();
  }

  getPopularPersons() {
    this.showPopularLoader = true;

    this.subscriptions$.push(this.personService.getPopular()
    .pipe(
      map((data: any) => data.results),
      finalize(() => this.showPopularLoader = false)
    )
    .subscribe(
      (results) => this.popularPersons = results,
      (error: HttpErrorResponse) => console.error(error)
    ));
  }

  showMorePopular() {
    if (this.maxPopularCount === 3) {
      this.maxPopularCount = 10;
    } else if (this.maxPopularCount === 10) {
      this.maxPopularCount = this.popularPersons.length;
    }
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
