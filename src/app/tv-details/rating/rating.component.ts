import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {

  constructor(private tvService: TvService) { }

  tv: any;
  tvSubscription;

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
