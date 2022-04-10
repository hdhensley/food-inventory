import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";

@Component({
  selector: 'app-edit-item-button',
  templateUrl: './edit-item-button.component.html',
})
export class EditItemButtonComponent {
  @Input() item: Item | undefined;
}
