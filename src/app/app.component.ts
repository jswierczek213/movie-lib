import { Component, DoCheck } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {

  constructor(private breakpointObserver: BreakpointObserver) {}

  links = [
    {title: 'Strona główna', link: '/'},
    {title: 'Filmy i seriale', link: '/movies-and-tv'},
    {title: 'Aktorzy', link: '/persons'}
  ];

  isSmallScreen: boolean;

  ngDoCheck() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
  }
}
