import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  searchForm: FormGroup;
  submitted = false;

  get query() {
    return this.searchForm.get('query');
  }

  ngOnInit() {
    this.searchForm = this.fb.group(
      {query: ['', [Validators.required]]}
    );
  }

}
