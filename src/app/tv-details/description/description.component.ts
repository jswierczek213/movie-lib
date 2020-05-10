import { Component, OnInit, OnDestroy } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit, OnDestroy {

  constructor(private tvService: TvService) { }

  tv: any;
  tvSubcription;

  overviewEng: string;

  showDescriptionLoader = false;
  showDescription = true;

  ngOnInit() {
    this.tvSubcription = this.tvService.tvData.subscribe(
      (data) => this.tv = data,
      (error) => console.error(error)
    );
  }

  showEngDescription() {
    this.showDescriptionLoader = true;
    this.tvService.getTvEnglishDescription(this.tv.id)
    .pipe(
      map((translation: any) => translation[0].data.overview),
      finalize(() => this.showDescriptionLoader = false)
    )
    .subscribe(
      (overview) => this.overviewEng = overview,
      (error: HttpErrorResponse) => console.error(error),
      () => {
        this.tv.overview = this.overviewEng;

        if (this.tv.overview.length === 0) {
          this.showDescription = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.tvSubcription.unsubscribe();
  }

}
