import {Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-table-container',
    templateUrl: './table-container.component.html',
    standalone: true,
    imports: [CardComponent, NgIf],
})
export class TableContainerComponent {
  @Input() showTable = false;
  @Input() title = 'TITLE';
}
