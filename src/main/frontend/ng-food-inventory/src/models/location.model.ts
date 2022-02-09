import {Item} from "./item.model";

export class Location {
  id: number | undefined;
  name: string | undefined;
  inventory_id: number | undefined;
  items: Item[] = [];
}
