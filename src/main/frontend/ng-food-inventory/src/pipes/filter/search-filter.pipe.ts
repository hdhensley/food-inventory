import { Pipe, PipeTransform } from '@angular/core';
import { Item } from "../../models/item.model";

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: Item[], query: string): Item[] {
    const searchterm = query.toLowerCase();
    return query == '' ?
      items :
      items.filter(i =>
        i.name.toLowerCase().indexOf(searchterm) > -1
        || i.brand?.toLowerCase().indexOf(searchterm) > -1
      );
  }
}
