import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesAndTvComponent } from './movies-and-tv/movies-and-tv.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { InfoComponent } from './tv-details/info/info.component';
import { DescriptionComponent } from './tv-details/description/description.component';
import { SeasonsComponent } from './tv-details/seasons/seasons.component';
import { RatingComponent } from './tv-details/rating/rating.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonsComponent } from './persons/persons.component';
import { DiscoverMoviesComponent } from './discover-movies/discover-movies.component';
import { DiscoverTvComponent } from './discover-tv/discover-tv.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movies-and-tv', component: MoviesAndTvComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {
    path: 'tv/:id',
    component: TvDetailsComponent,
    children: [
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'info', component: InfoComponent},
      {path: 'description', component: DescriptionComponent},
      {path: 'seasons', component: SeasonsComponent},
      {path: 'rating', component: RatingComponent}
    ]
  },
  {path: 'persons', component: PersonsComponent},
  {path: 'person/:id', component: PersonDetailsComponent},
  {path: 'search-results/:query', component: SearchResultsComponent},
  {path: 'discover/movies', component: DiscoverMoviesComponent},
  {path: 'discover/tv', component: DiscoverTvComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
