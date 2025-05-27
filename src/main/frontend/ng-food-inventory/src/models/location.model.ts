import { Item } from "./item.model";

export class Location {
  id: number | undefined;
  name: string | undefined;
  inventory_id: number | undefined;
  parent: Location | null | undefined;
  items: Item[] = [];
}
