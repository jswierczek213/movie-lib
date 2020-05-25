// Basic modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

// Components & services
import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SafePipe } from './safe.pipe';
import { MoviesAndTvComponent } from './movies-and-tv/movies-and-tv.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchService } from './services/search.service';
import { TvService } from './services/tv.service';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { InfoComponent } from './tv-details/info/info.component';
import { DescriptionComponent } from './tv-details/description/description.component';
import { SeasonsComponent } from './tv-details/seasons/seasons.component';
import { RatingComponent } from './tv-details/rating/rating.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonService } from './services/person.service';
import { DiscoverMoviesComponent } from './discover-movies/discover-movies.component';
import { DiscoverTvComponent } from './discover-tv/discover-tv.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    LoaderComponent,
    MovieDetailsComponent,
    SafePipe,
    MoviesAndTvComponent,
    SearchResultsComponent,
    TvDetailsComponent,
    InfoComponent,
    DescriptionComponent,
    SeasonsComponent,
    RatingComponent,
    PersonDetailsComponent,
    PersonsComponent,
    DiscoverMoviesComponent,
    DiscoverTvComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MovieService,
    SearchService,
    TvService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
