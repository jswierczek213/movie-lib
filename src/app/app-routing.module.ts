import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesAndTvComponent } from './movie-and-tv/movie-and-tv.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '/', pathMatch: 'full'},
  {path: 'movies-and-tv', component: MoviesAndTvComponent},
  {path: 'movie/:id', component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
