import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
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

  showLoader: boolean;
  notFound: boolean;

  ngOnInit() {
    this.showLoader = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.personId = parseInt(id, 10);

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
      () => this.notFound = false
    );
  }

}
