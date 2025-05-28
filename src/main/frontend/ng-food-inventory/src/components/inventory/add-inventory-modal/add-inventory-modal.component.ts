import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InventoryKeyService } from 'src/services/inventoryKey.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-add-inventory-modal',
    templateUrl: './add-inventory-modal.component.html',
    imports: [NgClass, NgIf, ReactiveFormsModule]
})
export class AddInventoryModalComponent implements OnInit {
  @Input() showModal = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  newInventoryForm: FormGroup | undefined;
  error = '';

  fb = inject(FormBuilder);
  inventoryKeyService = inject(InventoryKeyService);

  ngOnInit(): void {
    this.newInventoryForm = this.fb.group({
      newInventory: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  saveInventoryKey(form: FormGroup): void {
    if (!form.valid) {
      this.error = 'Please enter an inventory name to create';
      return;
    }

    this.error = '';

    this.inventoryKeyService.createInventory(form.value.newInventory);

    this.cancel();
  }

  cancel() {
    this.newInventoryForm?.reset();
    this.error = '';
    this.closeModal.emit(true);
  }
}
