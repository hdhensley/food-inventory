import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { InventoryService, LocationService } from "../../../services";
import { Location } from "../../../models/location.model";
import { NgClass, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-add-location-modal',
    template: `
      <div class="modal" [ngClass]="{ 'modal-open': showModal }">
        <form *ngIf="newLocationForm" [formGroup]="newLocationForm" (ngSubmit)="saveLocation(newLocationForm)">
          <div class="modal-box bg-primary text-primary-content">
            <label class="block text-sm font-bold mb-2" for="newLocation">
              New Location
            </label>
            <input  id="newLocation" 
                    name="newLocation" 
                    formControlName="newLocation"
                    class="input input-bordered w-full max-w-xs bg-neutral text-neutral-content" 
                    type="text"
                    placeholder="Location Name" />
            <label class="block text-sm font-bold my-2" for="parent"> Parent </label>
            <select id="parent" 
                    name="parent" 
                    formControlName="parent"
                    class="form-control w-full select select-bordered bg-neutral text-neutral-content">
              <option [value]="null">None</option>
              <option *ngFor="let location of this.inventoryService.locations()" [value]="location.id">
                {{ locationService.locationDisplayFormatter(location) }}
              </option>
            </select>
            <div class="modal-action flex justify-between">
              <button type="submit"
                class="bg-neutral-content hover:bg-neutral text-neutral hover:text-neutral-content font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Accept
              </button>
              <button (click)="cancel()"
                class="bg-error hover:bg-error-content text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
              </button>
            </div>
          </div>
        </form>
      </div>

    `,
    imports: [NgClass, NgIf, ReactiveFormsModule, NgFor]
})
export class AddLocationModalComponent {
  @Input() showModal = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  newLocationForm = inject(FormBuilder).group({
    newLocation: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    parent: new FormControl(null)
  });
  
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);

  saveLocation(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    const location = new Location();
    location.name = form.value.newLocation;
    location.inventory_id = this.inventoryService.inventory().id;
    location.parent = form.value.parent;

    this.locationService.addLocation(location);

    this.newLocationForm?.reset();
    this.closeModal.emit(true);
  }

  cancel() {
    this.newLocationForm?.reset();
    this.closeModal.emit(true);
  }
}
