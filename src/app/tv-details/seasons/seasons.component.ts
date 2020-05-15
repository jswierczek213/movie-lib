import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  constructor(private tvService: TvService) { }

  seasons: Array<any>;
  seasons$: Subscription;

  overviewEng: string;

  ngOnInit() {
    this.loadSeasonsData();
  }

  loadSeasonsData() {
    this.seasons$ = this.tvService.tvData
    .pipe(
      map((data: any) => data.seasons)
    )
    .subscribe(
      (data) => this.seasons = data,
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.seasons$.unsubscribe();
  }

}
