import { Location } from './location.model';

export class Inventory {
  id: number | undefined;
  inventoryKey: string | undefined;
  locations: Location[] = [];
}
