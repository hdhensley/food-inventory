import { Pipe, PipeTransform } from '@angular/core';
import { Item } from "../../models/item.model";

@Pipe({
    name: 'inactiveItems',
    standalone: true
})
export class InactiveItemsPipe implements PipeTransform {
  transform(items: Item[]): Item[] {
    return items.filter(i => i.removedDate).filter(i => !i.deletedDate);
  }

}
