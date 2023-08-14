import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {Item} from "../../../models/item.model";
import {InventoryService, LocationService} from "../../../services";
import { AddLocationModalComponent } from '../add-location-modal/add-location-modal.component';
import { ItemAddedAlertComponent } from '../item-added-alert/item-added-alert.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-edit-item-form',
    templateUrl: './edit-item-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        ItemAddedAlertComponent,
        NgFor,
        AddLocationModalComponent,
    ],
})
export class EditItemFormComponent implements OnInit {
  @Input() item: Item | undefined;
  @ViewChild('brandName') itemPrimaryRef: ElementRef|undefined;

  itemForm: FormGroup|undefined;
  showModal = false;

  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.itemForm = this.fb.group({
      item: new FormControl(this.item?.name, {
        validators: [Validators.required]
      }),
      brand: new FormControl(this.item?.brand, {
        validators: []
      }),
      quantity: new FormControl(this.item?.quantity, {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)]
      }),
      location: new FormControl(this.item?.location?.id, {
        validators: [Validators.required]
      })
    });
  }

  onFormSubmit({ value, valid }: { value: any, valid: boolean }): void {
    if(!valid || !this.item) {
      return;
    }

    //save the item and quantity to the inventory
    this.item.name = value.item;
    this.item.brand = value.brand;
    this.item.quantity = value.quantity;
    this.item.location = this.inventoryService.getLocation(value.location);

    this.inventoryService.saveItem(this.item).subscribe({
      error: console.error
    });
  }

  addLocation() {
    this.showModal = true;
  }
}
