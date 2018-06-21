import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.searchForm = this.createSearchForm();
  }

  createSearchForm(): FormGroup {
    return this.fb.group({
      'search': ['', Validators.required]
    });
  }

  send(): void {
    if (this.searchForm.valid) {
      this.onSearch.emit(this.searchForm.value);
    }
  }

}
