import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-item-added-alert',
    templateUrl: './item-added-alert.component.html',
    standalone: true,
    imports: [NgIf],
})
export class ItemAddedAlertComponent {
  @Input() item: Item | undefined;
}
