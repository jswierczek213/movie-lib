import { Component, OnInit } from '@angular/core';
import { TvService } from '../services/tv.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss']
})
export class TvDetailsComponent implements OnInit {

  constructor(private tvService: TvService, private route: ActivatedRoute) { }

  tv: any;
  tvId: number;

  showMainLoader = false;
  allLoaded = false;
  notFound = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tvId = parseInt(id, 10);

    this.tvService.getTvById(this.tvId).pipe(
      finalize(() => {
        this.showMainLoader = false;
      })
    ).subscribe(
      (result) => {
        this.tv = result;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.notFound = true;
      },
      () => {
        this.allLoaded = true;
        console.log(this.tv);
      }
    );
  }

}
