import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  constructor(private tvService: TvService) { }

  tv: any;
  tvSubscription;

  overviewEng: string;

  ngOnInit() {
    this.tvSubscription = this.tvService.tvData.subscribe(
      (data) => this.tv = data,
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.tvSubscription.unsubscribe();
  }

}
