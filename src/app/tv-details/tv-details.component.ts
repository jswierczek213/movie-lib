import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from '../services/tv.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss']
})
export class TvDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private tvService: TvService,
    private route: ActivatedRoute
  ) { }

  tv: any;
  tv$: Subscription;
  tvId: number;

  allLoaded = false;
  notFound = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tvId = parseInt(id, 10);

    this.loadTvData();
  }

  loadTvData() {
    this.tv$ = this.tvService.getTvById(this.tvId).subscribe(
      (result) => {
        this.tv = result;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.notFound = true;
      },
      () => {
        this.allLoaded = true;
        this.tvService.sendNewTvData(this.tv);
      }
    );
  }

  ngOnDestroy() {
    this.tv$.unsubscribe();
  }

}
