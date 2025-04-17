import {Component, EventEmitter, OnInit, Output, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-filter',
    template: `
      <div [formGroup]="form" class="flex flex-row justify-end mb-4 py-2">
        <input
          type="search"
          formControlName="search"
          class="bg-base text-base-content form-control block w-full px-3 py-1.5 font-normal bg-clip-padding border border-solid border-base rounded transition ease-in-out m-0 focus:border-accent-focus focus:outline-none"
          placeholder="search"
        />
      </div>
    `,
    imports: [ReactiveFormsModule]
})
export class FilterComponent implements OnInit {
  fb = inject(FormBuilder);

  form: FormGroup = new FormGroup({});

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.form = this.fb.group({search: new FormControl('')});

    this.form.get('search')?.valueChanges.subscribe((q: string) => this.searchChanged.emit(q));
  }
}
