import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-edit-item-button',
    templateUrl: './edit-item-button.component.html',
    standalone: true,
    imports: [NgIf, RouterLink],
})
export class EditItemButtonComponent {
  @Input() item: Item | undefined;
}
