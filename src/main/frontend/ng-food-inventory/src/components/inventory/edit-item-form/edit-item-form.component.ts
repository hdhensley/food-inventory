import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Item } from '../../../models/item.model';
import { InventoryService, ItemService, LocationService } from '../../../services';
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  imports: [NgIf, ReactiveFormsModule, NgFor, AddLocationModalComponent],
})
export class EditItemFormComponent {
  @Input() item: Item | undefined;
  @ViewChild('brandName') itemPrimaryRef: ElementRef | undefined;

  itemForm: FormGroup;
  showModal = false;

  itemService = inject(ItemService);
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
  fb = inject(FormBuilder);

  constructor() {
    this.itemForm = this.fb.group({
      item: new FormControl(this.item?.name, {
        validators: [Validators.required],
      }),
      brand: new FormControl(this.item?.brand, {
        validators: [],
      }),
      quantity: new FormControl(this.item?.quantity, {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      }),
      location: new FormControl(this.item?.location?.id, {
        validators: [Validators.required],
      }),
    });
  }

  onFormSubmit(form: FormGroup): void {
    if (!form.valid || !this.item) {
      return;
    }

    //save the item and quantity to the inventory
    this.item.name = form.value.item;
    this.item.brand = form.value.brand;
    this.item.quantity = form.value.quantity;
    this.item.location = this.locationService.getLocation(form.value.location);

    this.itemService.saveItem(this.item).subscribe({
      error: console.error,
    });
  }

  addLocation() {
    this.showModal = true;
  }
}
