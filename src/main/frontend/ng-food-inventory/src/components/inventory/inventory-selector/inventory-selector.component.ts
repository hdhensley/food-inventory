import { Component } from '@angular/core';
import { InventoryKeyService } from 'src/services/inventoryKey.service';

@Component({
  selector: 'app-inventory-selector',
  templateUrl: './inventory-selector.component.html',
})
export class InventorySelectorComponent {
    modalOpen: boolean = false;

    constructor(public inventoryKeyService: InventoryKeyService) {}

    setKey(key: string): void {
        this.inventoryKeyService.key.set(key);
    }

    openModal(): void {
        this.modalOpen = true;
    }

    closeModal(): void {
        this.modalOpen = false;
    }
}
