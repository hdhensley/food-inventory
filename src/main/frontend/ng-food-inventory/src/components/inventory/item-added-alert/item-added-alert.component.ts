import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";

@Component({
  selector: 'app-item-added-alert',
  templateUrl: './item-added-alert.component.html',
})
export class ItemAddedAlertComponent {
  @Input() item: Item | undefined;
}
