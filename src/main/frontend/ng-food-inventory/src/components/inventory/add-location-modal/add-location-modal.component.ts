import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { InventoryService } from "../../../services";
import { Location } from "../../../models/location.model";
import { NgClass, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-add-location-modal',
    templateUrl: './add-location-modal.component.html',
    imports: [NgClass, NgIf, ReactiveFormsModule, NgFor]
})
export class AddLocationModalComponent implements OnInit {
  @Input() showModal = false;

  newLocationForm: FormGroup | undefined;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  inventoryService = inject(InventoryService);

  ngOnInit(): void {
    this.newLocationForm = this.fb.group({
      newLocation: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      parent: new FormControl(null)
    });
  }

  saveLocation({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      return;
    }

    const location = new Location();
    location.name = value.newLocation;
    location.inventory_id = this.inventoryService.inventory().id;
    location.parent = value.parent;

    this.inventoryService.addLocation(location);

    this.newLocationForm?.reset();
    this.closeModal.emit(true);
  }

  cancel() {
    this.newLocationForm?.reset();
    this.closeModal.emit(true);
  }

  locations() {
    return this.inventoryService.locations();
  }
}
