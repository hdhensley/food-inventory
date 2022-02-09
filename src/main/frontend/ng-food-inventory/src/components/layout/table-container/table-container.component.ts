import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
})
export class TableContainerComponent {
  @Input() showTable: boolean = false;
  @Input() title: string = 'TITLE';
}
