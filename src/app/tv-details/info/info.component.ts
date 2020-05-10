import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  constructor(private tvService: TvService) { }

  tv: any;
  tvSubcription;

  ngOnInit() {
    this.tvSubcription = this.tvService.tvData.subscribe(
      (data) => this.tv = data,
      (error) => console.error(error)
    );
  }

  ngOnDestroy() {
    this.tvSubcription.unsubscribe();
  }

}
