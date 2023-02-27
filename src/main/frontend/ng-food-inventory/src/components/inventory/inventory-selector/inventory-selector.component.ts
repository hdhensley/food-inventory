import { Component, OnInit } from '@angular/core';
import { InventoryKeyService } from 'src/services/inventoryKey.service';

@Component({
  selector: 'app-inventory-selector',
  templateUrl: './inventory-selector.component.html',
})
export class InventorySelectorComponent implements OnInit {
    modalOpen: boolean = false;
    allKeys: Set<string> = new Set<string>();

    constructor(public inventoryKeyService: InventoryKeyService) {}

    ngOnInit(): void {
        this.inventoryKeyService.allKeySub.subscribe({
            next: (allKeys: Set<string>) => this.allKeys = allKeys
        })
    }

    setKey(key: string): void {
        this.inventoryKeyService.key = key;
    }

    openModal(): void {
        this.modalOpen = true;
    }

    closeModal(): void {
        this.modalOpen = false;
    }
}
