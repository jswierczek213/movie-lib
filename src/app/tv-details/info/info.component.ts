import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

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
