import {Component} from '@angular/core';
import {InventoryService} from "../../../services";
import {InactiveItemsPipe} from "../../../pipes";
import { InactiveItemsPipe as InactiveItemsPipe_1 } from '../../../pipes/filter/inactive-items.pipe';
import { DisplayDatePipe } from '../../../pipes/display-date.pipe';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-oos-table',
    templateUrl: './oos-table.component.html',
    providers: [InactiveItemsPipe],
    standalone: true,
    imports: [NgFor, DisplayDatePipe, InactiveItemsPipe_1]
})
export class OosTableComponent {
  constructor(public inventoryService: InventoryService) {}
}
