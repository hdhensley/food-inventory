import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../../services/location.service";
import {Location} from "../../../models/location.model";
import {InventoryService} from "../../../services";

@Component({
  selector: 'app-add-location-modal',
  templateUrl: './add-location-modal.component.html'
})
export class AddLocationModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  newLocationForm: FormGroup|undefined;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private locationService: LocationService
  ){}

  ngOnInit(): void {
    this.newLocationForm = this.fb.group({
      newLocation: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  saveLocation({ value, valid }: { value: any, valid: boolean }) {
    if(!valid) {
      return;
    }

    const location = new Location();
    location.name = value.newLocation;
    location.inventory_id = this.inventoryService.inventory.id;

    this.inventoryService.addLocation(location)
      .then((res) => {
        this.newLocationForm?.reset();
        this.closeModal.emit(true);
      })
      .catch(err => console.error(err));
  }

  cancel() {
    this.newLocationForm?.reset();
    this.closeModal.emit(true);
  }
}
