import { Component } from '@angular/core';
import { InventoryKeyService } from 'src/services/inventoryKey.service';
import { AddInventoryModalComponent } from '../add-inventory-modal/add-inventory-modal.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-inventory-selector',
    templateUrl: './inventory-selector.component.html',
    standalone: true,
    imports: [NgFor, AddInventoryModalComponent],
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
