import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InventoryService, LocationService } from '../../../services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Item } from '../../../models/item.model';
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';
import { ItemAddedAlertComponent } from '../item-added-alert/item-added-alert.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-add-item-form',
    templateUrl: './add-item-form.component.html',
    imports: [
        NgIf,
        ReactiveFormsModule,
        ItemAddedAlertComponent,
        NgFor,
        AddLocationModalComponent,
    ]
})
export class AddItemFormComponent implements OnInit {
  itemForm: FormGroup | undefined;

  @ViewChild('brandName') itemPrimaryRef: ElementRef | undefined;

  showModal = false;

  lastItem: Item | undefined; //Should always be an Item object

  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const currentLocation =
      this.locationService.activeLocation() === 0
        ? null
        : this.locationService.activeLocation();

    this.itemForm = this.fb.group({
      item: new FormControl('', {
        validators: [Validators.required],
      }),
      brand: new FormControl('', {
        validators: [],
      }),
      quantity: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      }),
      location: new FormControl(currentLocation, {
        validators: [Validators.required],
      }),
    });
  }

  onFormSubmit({ value, valid }: { value: any; valid: boolean }): void {
    if (!valid) {
      return;
    }

    //save the item and quantity to the inventory
    const item = new Item();
    item.name = value.item;
    item.brand = value.brand;
    item.quantity = value.quantity;
    item.location = this.inventoryService.getLocation(value.location);

    this.inventoryService.saveItem(item).subscribe();

    this.itemForm?.reset();
    this.itemPrimaryRef?.nativeElement?.focus();
  }

  addLocation() {
    console.log('show the add location modal');
    this.showModal = true;
  }
}
