import {Component} from '@angular/core';
import {InventoryService, LocationService} from "../../../services";
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-inventory-filter',
    templateUrl: './inventory-filter.component.html',
    standalone: true,
    imports: [
        NgClass,
        NgFor,
        NgIf,
        RouterLink,
    ],
})
export class InventoryFilterComponent {
  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService
  ){}
}
