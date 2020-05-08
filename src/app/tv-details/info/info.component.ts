import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private tvService: TvService) { }

  tv: any;

  ngOnInit() {
    this.tvService.tvData.subscribe(
      (data) => {
        this.tv = data;
      },
      (error) => console.error(error)
    );
  }

}
