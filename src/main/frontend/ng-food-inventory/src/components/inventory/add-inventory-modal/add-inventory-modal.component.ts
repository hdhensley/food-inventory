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
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
})
export class AddInventoryModalComponent implements OnInit {
  @Input() showModal = false;

  newInventoryForm: FormGroup | undefined;
  error = '';

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  inventoryKeyService = inject(InventoryKeyService);

  ngOnInit(): void {
    this.newInventoryForm = this.fb.group({
      newInventory: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  saveInventoryKey({ value, valid }: { value: any; valid: boolean }) {
    if (!valid) {
      this.error = 'Please enter an inventory name to create';
      return;
    }

    this.error = '';

    this.inventoryKeyService.createInventory(value.newInventory);

    this.cancel();
  }

  cancel() {
    this.newInventoryForm?.reset();
    this.error = '';
    this.closeModal.emit(true);
  }
}
