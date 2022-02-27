import { Pipe, PipeTransform } from '@angular/core';
import {Item} from "../../../models/item.model";

@Pipe({
  name: 'activeItems'
})
export class ActiveItemsPipe implements PipeTransform {

  transform(items: Item[], activeLocation: number = 0): Item[] {
    items = items.filter(i => !i.removedDate && !i.deletedDate);

    if(activeLocation != 0){
      items = items.filter(i => i.location?.id === activeLocation);
    }

    return items;
  }

}
