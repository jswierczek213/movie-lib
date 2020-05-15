import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {

  constructor(private tvService: TvService) { }

  tv: any;
  tv$: Subscription;

  ngOnInit() {
    this.loadTvData();
  }

  loadTvData() {
    this.tv$ = this.tvService.tvData.subscribe(
      (data) => this.tv = data,
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.tv$.unsubscribe();
  }

}
