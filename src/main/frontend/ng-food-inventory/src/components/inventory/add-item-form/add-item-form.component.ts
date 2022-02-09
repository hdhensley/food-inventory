import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InventoryService} from "../../../services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Item} from "../../../models/item.model";

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html'
})
export class AddItemFormComponent implements OnInit {
  itemForm: FormGroup|undefined;

  @ViewChild('itemName') itemNameRef: ElementRef|undefined;

  showModal: boolean = false;

  constructor(
    public inventoryService: InventoryService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.itemForm = this.fb.group({
      item: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      quantity: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      }),
      location: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  onFormSubmit({ value, valid }: { value: any, valid: boolean }): void {
    if(!valid) {
      return;
    }

    //save the item and quantity to the inventory
    const item = new Item();
    item.name = value.item;
    item.quantity = value.quantity;
    item.location = this.inventoryService.getLocation(value.location);

    this.inventoryService.addItem(item);

    this.itemForm?.reset();
    this.itemNameRef?.nativeElement?.focus();
  }

  addLocation() {
    console.log('show the add location modal');
    this.showModal = true;
  }
}
