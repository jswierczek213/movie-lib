import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  searchForm: FormGroup;
  submitted = false;
  enableErrors = false;
  placeholder = 'Szukaj filmu, serialu lub aktora';

  get query() {
    return this.searchForm.get('query');
  }

  ngOnInit() {
    this.searchForm = this.fb.group(
      {query: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]]}
    );
  }

  submit(): void {
    this.enableErrors = true;

    if (this.searchForm.valid) {
      this.router.navigate(['/search-results', this.searchForm.value.query]);
    }
  }

}
