import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    standalone: true,
    imports: [ReactiveFormsModule],
})
export class FilterComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.form = this.fb.group({search: new FormControl('')});

    // @ts-ignore
    this.form.get('search').valueChanges.subscribe((q: string) => this.searchChanged.emit(q));
  }
}
