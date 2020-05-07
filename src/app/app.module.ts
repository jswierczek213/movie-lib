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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    LoaderComponent,
    MovieDetailsComponent,
    SafePipe,
    MoviesAndTvComponent,
    SearchResultsComponent
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
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
