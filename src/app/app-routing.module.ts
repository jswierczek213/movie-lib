import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesAndTvComponent } from './movies-and-tv/movies-and-tv.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '/', pathMatch: 'full'},
  {path: 'movies-and-tv', component: MoviesAndTvComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'search-results/:query', component: SearchResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
