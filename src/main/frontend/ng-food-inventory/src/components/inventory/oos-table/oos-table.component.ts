import {Component} from '@angular/core';
import {InventoryService} from "../../../services";
import {InactiveItemsPipe} from "../../../pipes";
import { DisplayDatePipe } from '../../../pipes';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-oos-table',
    templateUrl: './oos-table.component.html',
    providers: [InactiveItemsPipe],
    standalone: true,
    imports: [NgFor, DisplayDatePipe, InactiveItemsPipe]
})
export class OosTableComponent {
  constructor(
    public inventoryService: InventoryService,
    private inactiveItemsPipe: InactiveItemsPipe
  ){}

  clearAll() {
    this.inactiveItemsPipe
      .transform(this.inventoryService.items)
      .forEach(item => this.inventoryService.delete(item.id));
  }
}
