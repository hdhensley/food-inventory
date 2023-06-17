import { Component, signal } from '@angular/core';
import { InventoryKeyService } from 'src/services/inventoryKey.service';
import { AddInventoryModalComponent } from '../add-inventory-modal/add-inventory-modal.component';
import { NgFor } from '@angular/common';
import { LocationService } from 'src/services';

@Component({
  selector: 'app-inventory-selector',
  templateUrl: './inventory-selector.component.html',
  standalone: true,
  imports: [NgFor, AddInventoryModalComponent],
})
export class InventorySelectorComponent {
  modalOpen = signal(false);

  constructor(
    public inventoryKeyService: InventoryKeyService,
    private locationService: LocationService
  ) { }

  setKey(key: string): void {
    this.inventoryKeyService.key.set(key);
    this.locationService.clearActive();
  }
}
