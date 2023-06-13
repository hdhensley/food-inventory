import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Item} from "../../../models/item.model";
import {InventoryService, LocationService} from "../../../services";

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
})
export class EditItemFormComponent implements OnInit {
  @Input() item: Item | undefined;
  @ViewChild('brandName') itemPrimaryRef: ElementRef|undefined;

  itemForm: FormGroup|undefined;
  showModal: boolean = false;
  lastItem: Item | undefined; //Should always be an Item object

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
      next: i => this.lastItem = i,
      error: console.error
    });
  }

  addLocation() {
    this.showModal = true;
  }
}
